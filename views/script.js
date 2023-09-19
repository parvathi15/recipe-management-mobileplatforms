fetch("http://localhost:7000/recipes")
.then((data => {
console.log(data)
}))
.catch(error => {
console.error("Error fetching, error");
});