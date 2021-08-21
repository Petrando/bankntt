const { data, mutate, error } = useSWR('/api/dana/tabungan/tabunganList', fetcher);

const saveData = async () => {
        dispatch({type:"TOGGLE_LOADING"});
        const formData = createFormData();
    
        try {
			const saveResult = await fetchJson("/api/dana/tabungan/addSaving", {
			  method: "POST",
			  //headers: { "Content-Type": "application/json" },
              headers: {
                Accept: 'application/json'
              },
			  body: formData
			});
			
            console.log(saveResult);
			if(saveResult.message==="success"){
				closeAdding();
			}else{
                dispatch({type:"TOGGLE_LOADING"});
			}
			
		  } catch (error) {
			console.error("An unexpected error happened:", error);
            dispatch({type:"TOGGLE_LOADING"});
		  }
    }