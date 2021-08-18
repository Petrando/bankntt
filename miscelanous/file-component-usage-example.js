import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {Form, FormControl, FormCheck, FormFile, Image, Button, Modal} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import imageCompression from 'browser-image-compression';
import { FilePost, ArrowLeftRight, DashCircle, PlusCircleFill } from 'react-bootstrap-icons';
import {isAuthenticated} from '../auth';
import {createProduct} from './apiAdmin';
import {getCategories} from './apiAdmin1';

const AFormComponent = (props) => {
	const {myLabel, inputProps, myBelowLabel, requiredMessage, setValidated} = props;
	return (<>{typeof requiredMessage==='undefined'?
		<Form.Group>
			<Form.Label>{myLabel}</Form.Label>			
			<Form.Control {...inputProps} />			
			{typeof myBelowLabel!=='undefined'?
				<Form.Text className="text-muted">
					{myBelowLabel}
				</Form.Text>:null}
		</Form.Group>:
		<Form.Group>
			<Form.Label>{myLabel}</Form.Label>			
			<Form.Control {...inputProps} onInput={setValidated} required />			
			{typeof myBelowLabel!=='undefined'?
				<Form.Text className="text-muted">
					{myBelowLabel}
				</Form.Text>:null}
			<Form.Control.Feedback type="invalid">
				{requiredMessage}
            </Form.Control.Feedback>
		</Form.Group>
		}</>)
}

const RenderCategoriesSelect = (props) => {
	const {myId, myLabel, controlValue, controlChange, selection, selectionRender} = props;
	
	return (
		<Form.Group controlId={myId} as={Col} md={4} >
			<Form.Label>{myLabel}</Form.Label>
			<Form.Control as="select" value={controlValue} onChange={controlChange}>
				{selection.map(selectionRender)}
			</Form.Control>
		</Form.Group>
	)
}

const AddProduct = () => {	
	const [validated, setValidated] = useState(false);

	const [mainCategories, setMainCategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryIdx, setCategoryIdx] = useState(0);
	const [options, setOptions] = useState([]);
	const [optionIdx, setOptionIdx] = useState(0);
	const [subOptions, setSubOptions] = useState([]);
	const [subOptionIdx, setSubOptionIdx] = useState(0);

	const [itemData, setItemData] = useState({
		itemName:'', itemDescription:'', price:1, stock:1, isNewItem:true, productPic:null,
		category:{
			categoryId:'',
			option:{
				optionId:'',
				subOption:{
					subOptionId:''
				}
			}
		},
		formData:null
	});

	const [redirect, setRedirect] = useState(false);

	const [picData, setPicData] = useState({
		displayPic:null, compressedProductPic:null, compressedDisplayPic:null, editedProductPic:null
	});

	const {itemName, itemDescription, price, stock, isNewItem, productPic, category, formData} = itemData;
	const {displayPic, compressedProductPic, compressedDisplayPic, editedProductPic} = picData;

	const {user, token} = isAuthenticated();		
	
	const init = () => {
		getCategories().then(data => {
			if(data.error){
				console.log(data.error);
			} else {
				setMainCategories([...data]);
				const categories = data.map(d => {
					return {category:d.category, _id:d._id}
				});				
				setCategories(categories);

				const options = data[0].options.map(d => {return {category:d.category, _id:d._id}});
				setOptions(options);

				const subOptions = data[0].options[0].options;
				setSubOptions(subOptions);

				let formData = new FormData();				
				formData.set("itemName", itemName);
				formData.set("itemDescription", itemDescription);
				formData.set("price", price);
				formData.set("stock", stock);
				formData.set("isNewItem", isNewItem);

				setItemData({...itemData, formData})				
			}
		})
	}
	
	useEffect(() => {
		init();		
	}, []);		

	const handleChange = name => e => {
		const value = name==='isNewItem'?e.target.value==='true':name==='photo'?e.target.files[0]:e.target.value;
		formData.set(name, value);
		setItemData({...itemData, [name]:value});
	}

	const categoryOption = (ctg, i) => {
		const {category} = ctg;
		return (
			<option key={i} value={i}>{category}</option>
		)
	}
	
	const changeCategory = (evt) => {
		setCategoryIdx(evt.target.value)
		setOptions(mainCategories[evt.target.value].options.map(d => {return {category:d.category, _id:d._id}}));
		setOptionIdx(0);
		changeSubOption(evt.target.value, 0);
	}
	
	const renderOption = (subCtg, i) => <option key={i} value={i}>{subCtg.category}</option>

	const changeOption = (evt) => {
		setOptionIdx(evt.target.value);
		changeSubOption(categoryIdx, evt.target.value);
	}
	
	const renderSubOption = (subSubCtg, i) => <option key={i} value={i}>{subSubCtg.category}</option>

	const changeSubOption = (catIdx, subCatIdx) => {
		const mySubSubCategory = mainCategories[catIdx].options[subCatIdx].options;
		setSubOptions(typeof mySubSubCategory!=='undefined'?mySubSubCategory:[]);
		setSubOptionIdx(0);
	}				

	const submitForm = (e) => {
		e.preventDefault();

		if(itemName === ''){
			alert('Product name is required.');
			return;
		}
		if(productPic === null){
			alert('Photo is required');
			return;
		}

		setFormData_Category();
		
		createProduct(user._id, token, formData)
			.then(data => {
				if(typeof data==='undefined'){
					return;
				}
				if(data.error){
					console.log(data.error)
				} else {
					console.log(data);
					setItemData({itemName:'', itemDescription:'', price:1, stock:1, isNewItem:true, productPic:null, formData:new FormData()});
					setPicData({displayPic:null, compressedProductPic:null, compressedDisplayPic:null, editedProductPic:null});
					setRedirect(true);
				}
			})
	}
	
	const setFormData_Category = () => {
		const categoryId = categories[categoryIdx]._id;
		const optionId = options[optionIdx]._id;
		let option = {optionId}

		const subOptionId = subOptions.length>0?subOptions[subOptionIdx]._id:"";
		if(subOptionId!==""){
			option.subOption = {subOptionId}
		}

		const categoryObj = {categoryId, option}
		console.log(categoryObj);
		formData.set("category", JSON.stringify(categoryObj));		
	}

	const redirectToHome = () => (
		redirect && <Redirect to="/" />
	)

	return (
		<Layout title="Add Product" description={`Enter new product data`} className="container-fluid">			
			{redirectToHome()}
			<Form noValidate validated={false} onSubmit={(e) => submitForm(e)}>
				<Row>
					<RenderCategoriesSelect myId={"CategorySelect"} myLabel={"Category"} controlValue={categoryIdx} controlChange={(evt)=>changeCategory(evt)}
						selection={categories} selectionRender={categoryOption}
					/>
					<RenderCategoriesSelect myId={"SubCategorySelect"} myLabel={"Option"} controlValue={optionIdx} controlChange={(evt)=>changeOption(evt)}
						selection={options} selectionRender={renderOption}
					/>
					{subOptions.length>0?
						<RenderCategoriesSelect myId={"subSubCategorySelect"} myLabel={"sub options"} controlValue={subOptionIdx} 
							controlChange={(evt)=>setSubOptionIdx(evt.target.value)}
							selection={subOptions} selectionRender={renderSubOption}
						/>:null
					}				
				</Row>
				<Row>
					<Col md={9}>
						<AFormComponent myLabel={'Product Name'} requiredMessage={'Name must not be empty'} setValidated={()=>setValidated(false)}
							inputProps={{ type:'text', value:itemName, onChange:(handleChange("itemName")) }}
						/>
					</Col>
					<Col md={3}>
						<Form.Group>
							<Form.Label>Product Condition</Form.Label>
							<Row>
								<Col md={6}>
									<Form.Check        
										type={'radio'} label={'New'} id={'New-checkbox'} value={true}
										checked={isNewItem} onChange={handleChange("isNewItem")}
									/>
								</Col>
								<Col md={6}>
									<Form.Check        
										type={'radio'} label={'Used'} id={'Used-checkbox'} value={false}
										checked={!isNewItem} onChange={handleChange("isNewItem")}
									/>
								</Col>
							</Row>
						</Form.Group>
					</Col>
				</Row>
				<AFormComponent myLabel={'About the Product'} inputProps={{ type:'text', value:itemDescription, onChange:handleChange("itemDescription"), as:'textarea', rows:'3'}}/>
				<Row>												
					<Col md={6}>
						<AFormComponent myLabel={'Price'} inputProps={{type:'number', value:price, onChange:handleChange("price")}} />
					</Col>
					<Col md={6}>
						<AFormComponent myLabel={'Stock'} inputProps={{type:'number', value:stock, onChange:handleChange("stock")}}/>
					</Col>
				</Row>
				<Form.Group>			
					<Form.File 
						id="productPic"
						label={productPic===null?"Photo":productPic.name}
						custom
						onChange={(evt)=>{	
							if(typeof evt.target.files[0] === 'undefined'){
								return;
							}											
							const imageFile = evt.target.files[0];
							setItemData({...itemData, productPic:imageFile});
							formData.set("productPic", imageFile);	
							console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
							console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
							/*let reader = new FileReader();

							reader.onload = function(e) {
								setPicData({...picData, displayPic:e.target.result});
							}

							reader.readAsDataURL(evt.target.files[0]);*/
						
							const options = { 
								maxSizeMB: 0.5,          // (default: Number.POSITIVE_INFINITY)
								maxWidthOrHeight: 200,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
								useWebWorker:true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
								/*maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
								exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
								onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100) 
								fileType: string*/            // optional, fileType override
							}
							imageCompression(imageFile, options)
								.then(function (compressedFile) {
									console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
									console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
 
									//setCompressedProductPic(compressedFile); // write your own logic
									//setCompressedDisplayPic(URL.createObjectURL(compressedFile))
									setPicData({...picData, compressedProductPic:URL.createObjectURL(compressedFile),
											compressedDisplayPic:URL.createObjectURL(compressedFile)})
									})
								.catch(function (error) {
									console.log(error.message);
								});
							//setDisplayPic(URL.createObjectURL(evt.target.files[0]));
							setPicData({...picData, displayPic:URL.createObjectURL(evt.target.files[0])})
						}}
					/>
					<Form.Text className="text-muted">
						Width and height of the pic should be the same
					</Form.Text>
				</Form.Group>
				<div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:15}}>
					<Image src={editedProductPic===null?displayPic:displayPic===null?"data:image/png;base64," + editedProductPic:displayPic} rounded fluid style={{margins:10}}/>
				</div>
				<h5>Thumbnail </h5>
				<div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:15}}>
					<Image src={compressedDisplayPic} rounded fluid style={{margins:10}}/>
				</div>
				<div>
					 <Button variant="primary" type="submit">
    					Submit
  					 </Button>
  					 <Button variant="danger"
  					 	onClick={()=>setRedirect(true)}
  					 >
    					Cancel
  					 </Button>
				</div>
			</Form>
		</Layout>
	)
}

export default AddProduct;