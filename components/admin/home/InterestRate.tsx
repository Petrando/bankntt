import { FC, useState, useEffect } from "react";
import useSWR from 'swr';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import BlockIcon from '@material-ui/icons/Block';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { TableCardI } from "../../../types";
import styles from  "../../../styles/home/Interest.module.css";
import tableStyles from "../../../styles/components/InterestTable.module.css";
import ModalLayout from "../../globals/ModalLayout";
import fetchJson from "../../../lib/fetchJson";

const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = () => {
	const { data, mutate, error } = useSWR('/api/interests/listInterests', fetcher);
	const [editedIdx, setEditedIdx] = useState<number>(-1);

	const editedData = data?data.filter((d, i)=>i===editedIdx)[0]:{};

	const updateInterestData = () => {
		mutate();
	}
	return (
		<section className={"interestMain"}>
			<div className={`${styles.tableCards} ${"tableCards"}`}>
				{
					data &&
					data.length > 0 &&
					data.map((d, i) => (<TableCard key={i} {...d} setEdited={()=>{setEditedIdx(i);}}/>))
				}				
			</div>
			{
				editedIdx !== -1 &&
				<ModalLayout closeModal={()=>{setEditedIdx(-1);}}>
					<div className={"editedContainer"}
						onClick={(e)=>{
							e.stopPropagation();
							e.preventDefault();
						}}
					>
						<EditedTableCard {...editedData} setEdited={()=>{setEditedIdx(-1)}} 
														  updateInterestData={()=>{updateInterestData();}} />
					</div>
				</ModalLayout>
			}
			{
				error &&
				<h3 style={{width:"100%", textAlign:"center"}}>Connection error</h3>
			}
			{
				!data &&
				<h3>Loading....</h3>
			}
			<style jsx>
				{
					`
						.interestMain {
							max-width: 100%;	
							width: 100%;
						  	margin-top: 0px;
							height: 100%;
							background-color: lightsteelblue;
							display:flex;justify-content:space-around;align-items:center;
							flex-wrap:wrap;
						}
						.tableCards {
							width:95%;
							height:auto;
						}
						.editedContainer {
							width:648px;
							height:auto;
							background-color:#ffffff;
							display:flex;justify-content:space-around;align-items:center;
							border-radius:5px;
						}
						@media (max-width:648px) {
							.editedContainer {
								width:90%;
							}
						}
					`
				}
			</style>
		</section>
	)
}

const TableCard:FC<TableCardI> = ({ title, rates, firstColumnTitle, setEdited}) => {
	return (
		<div className={`${styles.tableCard} ${styles.flexRule}`}>
			<div className={tableStyles.titleContainer}>
				<h2 className={`${styles.interestTitle}`}>{title}</h2>
				<span className={tableStyles.editButton} onClick={setEdited}>
					Edit
					<EditIcon fontSize="inherit" />
				</span>
			</div>			
			<table className={tableStyles.interests}>
				<thead>
				<tr>
					<th>
						{firstColumnTitle}
					</th>
					<th>Rate</th>
				</tr>
				</thead>
				<tbody>
				{
					rates.map((d, i) => (
						<tr key={i}>
							<td>{d.range}</td>
							<td>{d.rate}%</td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

const EditedTableCard:FC<TableCardI> = ({ _id, title, rates, firstColumnTitle, setEdited, updateInterestData}) => {
	const [editedRateIdx, setEditedRate] = useState<number>(-1);
	const [aRowIsDirty, setARowIsDirty] = useState<boolean>(false);

	const changeEditedRate = (idx) => {
		setEditedRate(idx===editedRateIdx?-1:idx);
	}

	const saveEdit = async (newEditData) => {
		const updatedRates = rates.slice();
		updatedRates[editedRateIdx] = newEditData;

		const body = {
			_id,
			rates:updatedRates
		}
		try {
			const updateResult = await fetchJson("/api/interests/updateInterest", {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify(body),
			});
			
			if(updateResult.message==="success"){
				updateInterestData();
				setEditedRate(-1);
				setARowIsDirty(false);
			}
			
		  } catch (error) {
			console.error("An unexpected error happened:", error);
		  }
	}

	return (
		<div className={`${styles.tableCard} ${styles.flexRule} ${styles.editedTableCard}`}>
			<div className={tableStyles.titleContainer}>
				<h2 className={`${styles.interestTitle}`}>{title}</h2>
				<span className={`${tableStyles.editButton} ${aRowIsDirty && "inactiveButton"}`} onClick={setEdited}>					
					<CheckCircleOutlineIcon fontSize="large" />
				</span>
			</div>			
			<table className={`${tableStyles.interests} ${tableStyles.editedInterest}`}>
				<thead>
				<tr>
					<th>
						{firstColumnTitle}
					</th>
					<th>Rate</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{
					rates.map((d, i) => (
						<EditableRateRow key={i} 
							{...d}
							iAmEdited={i===editedRateIdx}
							myIdx={i}
							changeEditedRate={()=>{changeEditedRate(i)}}
							stopEdit={()=>{setEditedRate(-1);}}
							setARowIsDirty={(rowIsDirty)=>{setARowIsDirty(rowIsDirty)}}
							aRowIsDirty={aRowIsDirty}
							saveEdit={(newEditData)=>{saveEdit(newEditData)}}
						/>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

interface EditedRowI {
	range:string;
	rate:string;
	iAmEdited:boolean;
	myIdx:number;
	changeEditedRate:(idx:number)=>void;
	stopEdit:()=>void;
	setARowIsDirty:(rowIsDirty:boolean)=>void;
	saveEdit:(newEditData:EditedI)=>void;
	aRowIsDirty:boolean;
}

interface EditedI {
	range:string;
	rate:number;
}

const EditableRateRow = ({range, rate, iAmEdited, changeEditedRate, myIdx, stopEdit, setARowIsDirty, saveEdit, aRowIsDirty}:EditedRowI) => {
	const [myRange, setMyRange] = useState<string>("");
	const [myRate, setMyRate] = useState<number>(0);

	useEffect(()=>{
		initiateStates();
	}, []);

	const initiateStates = () => {
		setMyRange(range);
		setMyRate(parseFloat(rate));
	}

	const editDirty = myRange!==range || myRate !== parseFloat(rate);

	useEffect(()=>{
		setARowIsDirty(editDirty);
	}, [editDirty])

	return (
		<tr>
			<td>
			{
				iAmEdited?
				<input
					className={"inputClass"} 
					type="text" value={myRange} onChange={(e)=>{setMyRange(e.target.value);}} />:
				myRange
			}
			</td>
			<td>
			{
				iAmEdited?
				<input 
					className={"inputClass"}
					type="number" value={myRate} onChange={(e)=>{setMyRate(parseFloat(e.target.value));}} />:
				myRate
			}
			{
				!iAmEdited && "%"
			}
			</td>
			<td><span className={"buttonsContainer"}>
			{
				iAmEdited?
				<>
					<span className={`${"spanButton"} ${!editDirty && "inactiveButton"}`}
						onClick={()=>{
							saveEdit({range:myRange, rate:myRate});
						}}
					>
						<SaveIcon />
					</span>
					<span className={"spanButton"} 
						  onClick={()=>{
							  stopEdit();
							  initiateStates();
						  }}>
						<CancelIcon  />
					</span>
				</>:
				<span className={`${"spanButton"} ${aRowIsDirty && "inactiveButton"}`}
					onClick={()=>{
						changeEditedRate(myIdx)
					}}
				>
					<EditIcon />
				</span>
			}
			</span>				
			</td>
			<style jsx>
				{`
					
					.buttonsContainer{
						width:100%%;
						display:flex;
						justify-content:center;
						align-items:center;
					}
					.inputClass {
						width:100%;
					}
					
				`}
			</style>
		</tr>
	)
}

export default InterestRate;