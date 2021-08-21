const fetcher = (url:string, options?:any) => fetch(url, options).then((res) => {console.log(res);return res.json();});

export default fetcher;