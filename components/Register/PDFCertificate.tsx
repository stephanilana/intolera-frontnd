import { useEffect, useState } from "react"; 
import FileInput from "../FileInput"; 
import Button from "../Button"; 
import { SwiperClass } from "swiper/react"; 
 
type PdfCertificate = { 
  swiperRef: React.MutableRefObject<SwiperClass | null>; 
  data: { 
    certificate: string | undefined; 
  }; 
  updateFieldHandler: (key: string, value: string) => void; 
}; 
 
function PDFCertificate({ 
  swiperRef, 
  data, 
  updateFieldHandler, 
}: PdfCertificate) { 
  const [isFormValid, setIsFormValid] = useState(false); 
 
  useEffect(() => { 
    const isFormFilled = Boolean(data.certificate); 
 
    setIsFormValid(isFormFilled); 
  }, [data]); 
 
  return ( 
    <> 
      <h2 className="my-16 text-center text-lg font-semibold"> 
        Anexe aqui seu documento de permissão para trabalhar na área da saúde 
      </h2> 
      <div> 
        <FileInput setFileValue={updateFieldHandler} /> 
      </div> 
      <div className="mt-10 flex space-x-4"> 
        <Button 
          onClick={() => swiperRef.current?.slidePrev()} 
          label="Anterior" 
        /> 
        <Button type="submit" label="Próximo" disabled={!isFormValid} /> 
      </div> 
    </> 
  ); 
} 
 
export default PDFCertificate; 