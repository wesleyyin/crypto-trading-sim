# minimalist_social_media

Cited code:
salted pass:
https://stackoverflow.com/questions/43092071/how-should-i-store-salts-and-passwords-in-mongodb/43094720

General app structure: followed tutorial: https://www.youtube.com/watch?v=7CqJlxBYj-M




for getting img from html to js: 
https://stackoverflow.com/questions/7372637/grab-image-from-input-field-to-get-image-data-display-image

for sending img from js to node:
https://stackoverflow.com/questions/39663961/how-do-you-send-images-to-node-js-with-axios

for saving imgs to fs
https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

^I am still looking into renaming the image to match the post id, so the client can access the img given a reference to the post

change of plans, the stored image id should be the post object id+the original file name, to maintain the extension

//ok I'm still tweaking on this, maybe just implement more of the project first so I can properly tinker with this

^look into sending the desired name as a feild in the req

Retrieve img on client directly from fs location given post info(id)

Better way to do this through react:
https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c

references to other objects: good for post and notification arrays in User
https://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids

use websocket for notifications updates

actual image stuff:
https://dev.to/yosraskhiri/how-to-upload-an-image-using-mern-stack-1j95

React User Sessions: https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react 