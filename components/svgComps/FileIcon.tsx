const FileIcon = (props: any) => ( 
  <svg 
    {...props} 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg" 
  > 
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /> 
    <polyline points="13 2 13 9 20 9" /> 
  </svg> 
); 
 
export default FileIcon; 