/* 
Por si acaso esto se ve interesante:
- https://forrestwebco.com/post/how-to-handle-trix-image-attachments-with-react-and-express por si acaso para el trix

this.trixInput.current.addEventListener("trix-attachment-add", event => {
    let attachment = event.attachment;
    if (attachment.file) {
      this.uploadImage(attachment);
    }
  });

  uploadImage = (attachment) => {
    let imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", attachment.file);
    axios.post('/images/upload', imageFormObj)
      .then((data) => {
        if (data.data.success) {
          let imageURL = data.data.image.data;
          attachment.setAttributes({
            url: '/' + imageURL
          })
        }
      });
    } */

    /* const ruta = 'http://localhost:5200/public/uploads/trix/'; */
    (function() {
        const HOST = "https://d13txem1unpe48.cloudfront.net/";
        /* const HOST = ruta; */
      //console.log(ruta);
        addEventListener("trix-attachment-add", function(event) {
          if (event.attachment.file) {
            uploadFileAttachment(event.attachment)
          }
        })
      
        function uploadFileAttachment(attachment) {
          uploadFile(attachment.file, setProgress, setAttributes)
      
          function setProgress(progress) {
            attachment.setUploadProgress(progress)
          }
      
          function setAttributes(attributes) {
            attachment.setAttributes(attributes)
          }
        }
      
        function uploadFile(file, progressCallback, successCallback) {
          const key = createStorageKey(file)
          const formData = createFormData(key, file)
          const xhr = new XMLHttpRequest()
      
          xhr.open("POST", HOST, true)
      
          xhr.upload.addEventListener("progress", function(event) {
            const progress = event.loaded / event.total * 100
            progressCallback(progress)
          })
      
          xhr.addEventListener("load", function(event) {
            if (xhr.status == 204) {
              const attributes = {
                url: HOST + key,
                href: HOST + key + "?content-disposition=attachment"
              }
              successCallback(attributes)
            }
          })
      
          xhr.send(formData)
        }
      
        function createStorageKey(file) {
          const date = new Date()
          const day = date.toISOString().slice(0,10)
          const name = date.getTime() + "-" + file.name
          return [ "tmp", day, name ].join("/")
        }
      
        function createFormData(key, file) {
          const data = new FormData()
          data.append("key", key)
          data.append("Content-Type", file.type)
          data.append("file", file)
          return data
        }
      })();