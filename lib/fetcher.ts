const fetcher = (url) => fetch(url).then((res) => {console.log(res);return res.json();});

export default fetcher;