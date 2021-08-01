import {FC, Dispatch, SetStateAction} from "react";
import styles from "../../styles/components/Pagination.module.css";

interface PaginationI {
	setCurrentPage: Dispatch<SetStateAction<Number>>;
	currentPage: number;
	pageCount: number;
}

const Pagination:FC<PaginationI> = ({currentPage, setCurrentPage, pageCount}) => {
	return (
		<div className={styles.container}>
			<div className={`${styles.prevNextButton} ${currentPage===0 && styles.notActive}`}
				onClick={()=>{
					setCurrentPage(0);					
				}}
			>
				{"<<"}
			</div>
			<div className={`${styles.prevNextButton} ${currentPage===0 && styles.notActive}`}
				onClick={()=>{
					if(currentPage > 0){
						setCurrentPage(currentPage - 1);
					}					
				}}
			>
				{"<"}
			</div>
			<div className={styles.pageButton}>
				{currentPage + 1}
			</div>
			<div className={`${styles.prevNextButton} ${currentPage===pageCount-1 && styles.notActive}`}
				onClick={()=>{
					if(currentPage < pageCount - 1){
						setCurrentPage(currentPage + 1);
					}					
				}}
			>
				{">"}
			</div>
			<div className={`${styles.prevNextButton} ${currentPage===pageCount-1 && styles.notActive}`}
				onClick={()=>{
					setCurrentPage(pageCount - 1);					
				}}
			>
				{">>"}
			</div>
		</div>
	)
}

export default Pagination;