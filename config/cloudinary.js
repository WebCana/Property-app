import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})


export default cloudinary

// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dswrexrmh', 
//   api_key: '326357542763961', 
//   api_secret: 'f80p3qQVBJyup2D6JQ6ALUu0uW8' 
// });

