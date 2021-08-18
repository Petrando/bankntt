const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;
const Product = require('../models/product.model');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {	
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {

			if(err || !product){
				return res.status(400).json({
					error: 'Product not found'
				});
			}
			req.product = product;
			next();
		})			
}

exports.read = (req, res) => {
	req.product.productPic = undefined;
	return res.json(req.product);
}

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {		
		
		if(err){
			return res.status(400).json({
				error: 'Uploading image failed'
			});
		}
		
		const {itemName, itemDescription, price, stock} = fields;
		fields.category = JSON.parse(fields.category);
		
		if(!itemName || !itemDescription || !price || !fields.category || !stock){
			return res.status(400).json({
				error: 'Missing field(s)!'
			})
		}
		
		let product = new Product(fields);
		
		if(files.productPic){
			if(files.productPic.size > 1000000){
				return res.status(400).json({
					error: 'Image must be less than 1MB'
				})
			}
			product.productPic.data = fs.readFileSync(files.productPic.path);
			product.productPic.contentType = files.productPic.type;
		}
		
		product.save((err, data) => {
			if(err){
				res.status(400).json({
					error:errorHandler(err)
				})
			}
			
			res.status(200).json({data});
		})		
		
	})
}

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if(err){
			return res.status(400).json({
				error: 'Uploading image failed'
			});
		}
		
		const {name, description, price, category, stock} = fields;
		fields.category = JSON.parse(fields.category);
		/*if(!name || !description || !price || !category || !quantity){
			return res.status(400).json({
				error: 'Missing field(s)!'
			})
		}*/
		
		let product = req.product;
		product = _.extend(product, fields)
				
		if(files.productPic){
			if(files.productPic.size > 1000000){
				return res.status(400).json({
					error: 'Image must be less than 1MB'
				})
			}
			product.productPic.data = fs.readFileSync(files.productPic.path);
			product.productPic.contentType = files.productPic.type;
		}
		
		product.save((err, data) => {
			if(err){
				res.status(400).json({
					error:errorHandler(err)
				})
			}
			res.status(200).json({data});
		})
		
		
	})
}

exports.remove = (req, res) => {
	const {product} = req;
	product.remove((err, deletedProduct) => {
		if(err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json({
			deletedProduct,
			message:'Delete product successful'
		})
	})
}

exports.getSingleProduct = (req, res) => {
	const {prodId} = req.params;
	const myIdMatchStage = {$match:{$expr:{$eq:["$_id", ObjectId(prodId)]}}}
	getTheProducts(res, [myIdMatchStage]);	
}

function getTheProducts(res, matchStages = null){

	let projectionStage = {itemName:1,itemDescription:1,isNewItem:1,"category":1,stock:1,sold:1,rating:1,review:1,price:1,createdAt:1}	

	let aggregateStages = [		
		{
			$project : projectionStage
		},		
		{
			$lookup: {
				from:"category1",
				let:{
					categoryId:"$category.categoryId",
					optionid:"$category.option.optionId",
					subOptionId:"$category.option.subOption.subOptionId"
				},
				pipeline: [{$match: {$expr: {$eq:["$$categoryId", "$_id"]}}},{$unwind:"$options"},{$match: {$expr: {$eq:["$$optionid", "$options._id"]}}},				
					{$facet:{"withSubOptions":[
								{$match:{$expr:{$gt:[{$size:"$options.options"}, 0]}}},
								{$unwind:"$options.options"},
								{$match: {$expr: {$eq:["$$subOptionId", "$options.options._id"]}}}], 
							 "withoutSubOptions":[{$match:{$expr:{$eq:[{$size:"$options.options"}, 0]}}}]}}
				],
				as:"myCategory"
			}
		},
		{$unwind:"$myCategory"}
	]

	if(matchStages!==null){
		aggregateStages.unshift(...matchStages);		
	}

	Product.aggregate(aggregateStages)
		.then(products => {
			res.json(products);			
		})
    	.catch(err => res.status(400).json('Error: ' + err));
}

function getProductsPerPage(res, skip = 0, limit = 8 , matchStages = []){
	let productAggregation = [		
		{
			$project : {itemName:1,itemDescription:1,isNewItem:1,"category":1,stock:1,sold:1,rating:1,review:1,price:1,createdAt:1}
		},		
		{
			$lookup: {
				from:"category1",
				let:{
					categoryId:"$category.categoryId",
					optionid:"$category.option.optionId",
					subOptionId:"$category.option.subOption.subOptionId"
				},
				pipeline: [{$match: {$expr: {$eq:["$$categoryId", "$_id"]}}},{$unwind:"$options"},{$match: {$expr: {$eq:["$$optionid", "$options._id"]}}},				
					{$facet:{"withSubOptions":[
								{$match:{$expr:{$gt:[{$size:"$options.options"}, 0]}}},
								{$unwind:"$options.options"},
								{$match: {$expr: {$eq:["$$subOptionId", "$options.options._id"]}}}], 
							 "withoutSubOptions":[{$match:{$expr:{$eq:[{$size:"$options.options"}, 0]}}}]}}
				],
				as:"myCategory"
			}
		},
		{$unwind:"$myCategory"}
	]

	if(matchStages.length > 0){
		productAggregation.unshift(...matchStages);		
	}

	const productPerPageAggregation = [		
		...productAggregation,
		{$skip:parseInt(skip)},
		{$limit:parseInt(limit)}
	]

	//If want to return all item count also, then complete the below aggregation..
	/*
	if(skip === 0){//skip is zero only when first page, requesting also all item count for pagination 
				  //calculation
		Product.aggregate(productAggregation)
			.then(products => res.json(products))
    		.catch(err => res.status(400).json('Error: ' + err));		 

	}else {
		Product.aggregate(productPerPageAggregation)
			.then(products => res.json(products))
    		.catch(err => res.status(400).json('Error: ' + err));
	}*/
	Product.aggregate(productPerPageAggregation)
		.then(products => {				
			res.json(products);
		})
    	.catch(err => res.status(400).json('Error: ' + err));
}

exports.listAll = (req, res) => {
	const order = req.query.order?req.query.order:'asc';
	const sortBy = req.query.sortBy?req.query.sortBy:'_id';
	//const limit = req.query.limit?parseInt(req.query.limit):6;	
	const {skip, limit} = req.query;	

	const sortObj = sortBy === 'createdAt'?{createdAt:order==='asc'?1:-1}:{sold:order==='asc'?1:-1}	
	//{$sort:sortObj},
	//getTheProducts(res);			
	getProductsPerPage(res, skip, limit);
}

/*
find product based on current product category
other product of the same category will be returned
*/

exports.listRelated = (req, res) => {
	const {prodIdNotIncluded, categoryId, optionId, subOptionId, skip, limit} = req.params;
	console.log(req.params);
	/*const limit = req.query.limit?parseInt(req.query.limit):6;
	
	const {_id, category} = req.product;
	
	
	Product.find({_id:{$ne:req.product._id}, category:{$eq:category._id}})
		.select('-photo')
		.limit(limit)
		.populate('category', '_id name')
		.exec((err, products) => {
			if(err){
				res.status(400).json({
					error:'Products not found'
				})
			}
			res.json(products);
		});	*/

	let matchStages = [
						  {$ne:["$_id", ObjectId(prodIdNotIncluded)]},
						  {$eq:["$category.categoryId", ObjectId(categoryId)]}
					  ]

	optionId!=="0" && matchStages.push({$eq:["$category.option.optionId", ObjectId(optionId)]});
	subOptionId!=="0" && matchStages.push({$eq:["$category.option.subOption.subOptionId", ObjectId(subOptionId)]});

	const matchObj = {$match:{$expr:{$and:matchStages}}}
				
	getProductsPerPage(res, skip, limit, [matchObj]);			
}

exports.listCategories = ((req, res) => {
	Product.distinct('category', {}, (err, categories) => {
		if(err){
			return res.status(400).json({
				error: 'Categories not found'
			});
		}
		res.json(categories);
	})
});

exports.listByFilter = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    const {filters} = req.body;    
    const {category, price} = filters;
 	//Category filter format : [{categoryId, options:[{optionId, subOptions:[subOptionId]}]}]
 	//ada di : req.body.filters.category
 	
 	let categoryFilter = [];
 	category.length > 0 && category.forEach((c,i) => {//proper filter format
 		let categoryIdAndOptionId_AndArrayFilter = []
 		//first match with categoryId
 		categoryIdAndOptionId_AndArrayFilter.push({$eq:["$category.categoryId", ObjectId(c.categoryId)]});
 		//and then, if there are optionId, match with it
 		if(c.options.length > 0){
 			let optionId_ArrayFilter = [];

 			c.options.forEach((o,j) => {
 				let optionIdAndSubOptionId_ArrayFilter = []
 				optionIdAndSubOptionId_ArrayFilter.push({$eq:["$category.option.optionId", ObjectId(o.optionId)]});
 				if(o.subOptions.length > 0){ 					
 					let subOptionId_ArrayFilter = []
 					o.subOptions.forEach((sO, k) => {
 						subOptionId_ArrayFilter.push({$eq:["$category.option.subOption.subOptionId", ObjectId(sO)]});
 					}); 					
 					optionIdAndSubOptionId_ArrayFilter.push({$or:subOptionId_ArrayFilter})			
 				} 	 				
 				let optionIdAndSubOptionId_Filter = {$and:optionIdAndSubOptionId_ArrayFilter} 

 				optionId_ArrayFilter.push(optionIdAndSubOptionId_Filter);				
 			});
 			categoryIdAndOptionId_AndArrayFilter.push({$or:optionId_ArrayFilter});		
 		}
 		 	
 		const categoryIdAndOptionId_filter = {$and:categoryIdAndOptionId_AndArrayFilter} 		
 		categoryFilter.push(categoryIdAndOptionId_filter)
 	})
 	//simpler filter format is just match all categoryId, optionId, subOptionId in a single object
 	//and put them all in a single $or

 	const categoryFilterObj = categoryFilter.length > 0?[{$match:{$expr:{$or:categoryFilter}}}]:[];
 	let priceFilterObj = [];
 	if(price.length > 0){
 		let filterObj = null
 		if(price.length === 1){
 			filterObj = {$match:{$expr:{$gte:["$price", price[0]]}}}
 		}else{
 			filterObj = {$match:{$expr:{$and:[
							{$gte:["$price", price[0]]}, 
 							{$lt:["$price", price[1]]}
						]}}}							 
 		}
 		filterObj!==null && priceFilterObj.push(filterObj);
 	}

 	const categoryAndPriceFilter = priceFilterObj.concat(categoryFilterObj);
 	//console.log(categoryAndArrayFilter);
 	/*if(categoryAndArrayFilter.length > 0){
 		const {$and} = categoryAndArrayFilter[0];
 		console.log($and[0]);
 		console.log($and[1]);
 	}*/
 	
 	//const categoryFilterObj = [{$match:{$or:categoryFilter}}]
 	//const categoryFilterObj = [{$or:categoryFilter}] 	 	 	
 	
 	//category.length > 0 ?getProductsPerPage(res, skip, limit, categoryFilterObj):getProductsPerPage(res, skip, limit); 	
 	getProductsPerPage(res, skip, limit, categoryAndPriceFilter);
};

exports.listSearch = (req, res) => {
	const {search, categoryId, optionId, subOptionId, skip, limit} = req.query;
	const searchAggregation = [];	
	if(search!==""){
		const itemNameMatch = { $match: { $expr: { $regexFind: { input: "$itemName", regex: search, options:"i" }  } } }
		//const itemNameMatch = { itemName: { $regex: /pattern/, $options: '<options>' } }
		searchAggregation.push(itemNameMatch);
	}
	if(categoryId!==""){		
		const categoryMatch = {$match:{$expr:{$eq:["$category.categoryId", ObjectId(categoryId)]}}}
		searchAggregation.push(categoryMatch)		
	}
	if(optionId!==""){		
		const optionMatch = {$match:{$expr:{$eq:["$category.option.optionId", ObjectId(optionId)]}}}
		searchAggregation.push(optionMatch)		
	}
	if(subOptionId!==""){		
		const subOptionMatch = {$match:{$expr:{$eq:["$category.option.subOption.subOptionId", ObjectId(subOptionId)]}}}
		searchAggregation.push(subOptionMatch)		
	}
	
	//getTheProducts(res, searchAggregation);
	getProductsPerPage(res, skip, limit, searchAggregation);
}

exports.photo = (req, res, next) => {
	if(req.product.productPic.data) {
		res.set('Content-Type', req.product.productPic.contentType);
		return res.send(req.product.productPic.data);
	}
	next();
}

exports.decreaseQuantity = (req, res, next) => {
	let bulkOps = req.body.order.products.map((item) => {
		return {
			updateOne: {
				filter: {_id: item._id},
				update: {$inc: {quantity: -item.count, sold: +item.count}}
			}
		}
	});

	Product.bulkWrite(bulkOps, {}, (err, products) => {
		if(err) {
			return res.status(400).json({
				error: "Couldn't update product"
			})
		}
		next();
	});
}