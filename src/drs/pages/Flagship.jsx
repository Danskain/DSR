//import { useState } from 'react'


export const Flagship = () => {
  //const [formData, setFormData] = useState(new FormData());

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    const dateId = new Date();
    const IdTransaction = dateId.getDate()+''+(dateId.getMonth()+1)+''+dateId.getFullYear()+''+dateId.getHours()+''+dateId.getMinutes()+''+dateId.getSeconds();
    for (let i = 0; i < files.length; i++) {
      formData.append('file[]', files[i]);
    }    
    
    //formData.append('file', selectedFile);
    formData.append('IdTransaction', IdTransaction);
    console.log(IdTransaction) ;
    fetch('https://dsrapi.1dayfolders.com/libraries/uploadFile.php', {
      method: 'POST',
      body: formData,
      mode:'no-cors',
      dataType: 'multipart/form-data',
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // Realiza una solicitud HTTP con los datos de formData
    // (por ejemplo, utilizando fetch o axios)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileUpload} />
    </form>
  );
}
