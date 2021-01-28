const img1 = require('./cuber-favicon-0064x0064.png');
const img0 = './cuber-favicon-0064x0064.png';
const cubohtml = 
`
<html>
<body>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <h1>DAVID/</h1>
  <br></br>
  <br></br>
  <br></br>
  <br></br>

</body>
</html>
`;

const xcubohtml = 
`

<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=0.6, maximum-scale=0.6, user-scalable=0'/>
		<meta name='description' content='Rubik’s Cube'>
		<meta name='keywords' content='Erno Rubik’s Cube'>
		<link rel='stylesheet' type='text/css' href='./styles/cube.css'>
		<link rel='icon' type='image/png' href='./media/cuber-favicon-0064x0064.png'>
		<link rel='apple-touch-icon' href='./media/cuber-favicon-0144x0144.png'>
		<style>
		 html, body, #container{
		 	margin: 0px;
		 	padding: 0px;
		 	width: 100%;
		 	height: 100%;
		 }
		 #container{
		 	background: blue;
		 }
		</style>
		<title>Cube</title>
	</head>
    <body>
    </br>
    </br>
    </br>
    </br>
    <p>davids ${img0} </p>
    <img src="${img1}" alt='000' />
    <p>davids</p>

        <div id='container'></div>
      		<script src='../../../js/cube/cuber.min.js'></script>
		<script src='../../../js/photon.js'></script>
		<script src='../../../js/jquery-2.1.1.min.js'></script>
		<script>
			var container 	= document.querySelector( '#container' ),
				cube 		= new ERNO.Cube();
				light 		= new Photon.Light( 10, 0, 100 );
			container.appendChild( cube.domElement );
		</script>
	</body>
</html>

`;

export default cubohtml;

 












// module.exports = function() {
//     return `
//   `;};
// <!DOCTYPE html>
// <html>
// 	<head>
// 		<meta charset='utf-8'>
// 		<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0'/>
// 		<meta name='description' content='Rubik’s Cube'>
// 		<meta name='keywords' content='Erno Rubik’s Cube'>

// 		<link rel='stylesheet' type='text/css' href='styles/cube.css'>
// 		<!-- <link rel='stylesheet' type='text/css' href='examples/basic/styles/base.css'> -->
// 		<link rel='icon' type='image/png' href='media/cuber-favicon-0064x0064.png'>
// 		<link rel='apple-touch-icon' href='media/cuber-favicon-0144x0144.png'>

// 		<style>

// 		 html, body, #container{
// 		 	margin: 0px;
// 		 	padding: 0px;
// 		 	width: 100%;
// 		 	height: 100%;
// 		 }

// 		 #container{
// 		 	background: black;
// 		 }

// 		</style>

// 		<title>Cube</title>

// 	</head>
//     <body>
//     </br>
//     </br>
//     </br>
//     </br>
//     </br>
//     </br>
//     <h1>David</h1>
// 		<div id='container'></div>

// 		<script src='js/cube/cuber.min.js'></script>
// 		<script src='js/photon.js'></script>
// 		<script src='//code.jquery.com/jquery-2.1.1.min.js'></script>

// 		<script>

// 			var container 	= document.querySelector( '#container' ),
// 				cube 		= new ERNO.Cube();
// 				light 		= new Photon.Light( 10, 0, 100 );

// 			container.appendChild( cube.domElement );

// 		</script>
// 	</body>
// </html>

//   `;};
