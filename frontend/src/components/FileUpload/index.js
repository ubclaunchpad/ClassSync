// FileUpload.js
import React from 'react';

const FileUpload = ({ getRootProps, getInputProps, isDragActive, files, handleDelete }) => (
    <div>
              <h4> Upload Files for Tutors</h4>

       <div
        {...getRootProps({
        //   className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4' style={{ 
    width: '90%', 
    margin: '5px',
    border: '2px dashed #1890ff', 
    borderRadius: '10px', 
    backgroundColor: '#e6f7ff', 
    color: '#1890ff', 
    fontSize: '14px', 
    textAlign: 'center', 
    cursor: 'pointer',
}}>       
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill='#103da2'/></svg>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <>
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxHeight: '300px', overflowY: 'auto', alignItems: 'flex-start', marginTop: '10px' }}>
        {files.map((file, index) => (
            <div key={index} style={{ fontSize: '14px', color: '#333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e6f7ff', padding: '10px', margin: '5px', borderRadius: '5px' }}>
                {file.name}
                <button onClick={() => handleDelete(file.name)} style={{ marginLeft: '10px', color: '#1890ff', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>X</button>
            </div>
        ))}
    </div>
        
        </>
    </div>
);

export default FileUpload;