fetch('http://localhost:3000/localizacao', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    lat: -3.73,
    lon: -38.52
  })
})
.then(res => res.text())
.then(data => console.log(data))
.catch(err => console.log(err));