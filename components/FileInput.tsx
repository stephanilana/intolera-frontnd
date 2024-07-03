import { useCallback, useState } from "react"; 
import { DropzoneState, useDropzone } from "react-dropzone"; 
import UploadIcon from "./svgComps/UploadIcon"; 
import FileIcon from "./svgComps/FileIcon"; 
import CloseIcon from "./svgComps/CloseIcon"; 
 
interface InputProps { 
  dropzone: DropzoneState; 
} 
 
interface HasFileProps { 
  file?: File; 
  removeFile: () => void; 
} 
 
interface FileInputProps { 
  setFileValue: (field: string, value: string) => void; 
} 
 
const FileInput = ({ setFileValue }: FileInputProps) => { 
  const [file, setFile] = useState<File | null>(null); 
 
  const removeFile = useCallback(() => { 
    setFile(null); 
    setFileValue("certificate", ""); 
  }, [setFileValue]); 
 
  const onDrop = useCallback( 
    (files: File[]) => { 
      const file = files[0]; 
      setFile(file); 
 
      const reader = new FileReader(); 
      reader.onloadend = () => { 
        const base64 = reader.result?.toString().split(",")[1]; 
        console.log(base64); 
        setFileValue("certificate", base64 || ""); 
      }; 
      reader.readAsDataURL(file); 
    }, 
    [setFileValue] 
  ); 
 
 const dropzone = useDropzone({
    onDrop, 
    accept: { 
      "image/*": [".jpeg", ".jpg", ".png", ".gif"], 
    }, 
  }); 
 
 if (file) return <HasFile file={file} removeFile={removeFile} />; 
 
  return <Input dropzone={dropzone} />; 
}; 
 
const Input = ({ dropzone }: InputProps) => { 
  const { getRootProps, getInputProps, isDragActive } = dropzone; 
 
  return ( 
    <div 
      {...getRootProps()} 
      className={`h-full rounded-lg border-4 border-dashed bg-white transition-all hover:border-blue-600 hover:bg-gray-100 
      ${isDragActive ? "border-blue-700" : "border-blue-500"}`} 
    > 
      <label htmlFor="dropzone-file" className="h-full w-full cursor-pointer"> 
        <div className="flex h-full w-full flex-col items-center justify-center pb-3 pt-3"> 
          {isDragActive ? ( 
            <p className="text-lg font-bold text-blue-400"> 
              Solte para adicionar 
            </p> 
          ) : ( 
            <p className="mb-2 flex text-center text-sm"> 
              Escolher arquivo 
              <UploadIcon 
                className={`ml-1 h-6 w-4 ${ 
                  isDragActive ? "text-blue-500" : "text-gray-600" 
                }`} 
              /> 
            </p> 
          )} 
        </div> 
      </label> 
      <input {...getInputProps()} className="hidden" /> 
    </div> 
  ); 
}; 
 
const HasFile = ({ file, removeFile }: HasFileProps) => ( 
  <div className="flex h-full items-center justify-center rounded-lg border-4 border-dashed border-blue-500"> 
    <div className="flex items-center justify-center gap-3 rounded-md bg-white"> 
      <FileIcon className="my-4 ml-4 h-5 w-5" /> 
      <span className="mb-2 flex text-center text-sm">{file?.name}</span> 
      <button 
        type="button" 
        onClick={removeFile} 
        className="mt-1 place-self-start p-1" 
      > 
        <CloseIcon className="h-5 w-5" /> 
      </button> 
    </div> 
  </div> 
); 
 
export default FileInput; 