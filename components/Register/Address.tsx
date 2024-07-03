import React, { useEffect, useState } from "react"; 
import RegisterTitle from "./RegisterTitle"; 
import InputField from "../InputField"; 
import Button from "../Button"; 
import { SwiperClass } from 'swiper/react'; 
 
type AddressProps = { 
  swiperRef: React.MutableRefObject<SwiperClass | null>; 
  data: { 
    state: string; 
    city: string; 
    street: string; 
    postalCode: string; 
    phone: string; 
  }; 
  updateFieldHandler: (key: string, value: string) => void; 
}; 
 
function Address({ swiperRef, data, updateFieldHandler }: AddressProps) { 
  const [isFormValid, setIsFormValid] = useState(false); 
 
  useEffect(() => { 
    const isFormFilled = Boolean( 
      data.state && data.city && data.street && data.postalCode && data.phone 
    ); 
    setIsFormValid(isFormFilled); 
  }, [data]); 
 
  return ( 
    <> 
      <div> 
        <RegisterTitle title="ENDEREÇO" /> 
        <div className="flex flex-col gap-2"> 
          <InputField 
            id="state" 
            type="text" 
            label="Estado:" 
            value={data.state} 
            onChange={updateFieldHandler} 
            placeholder="Estado" 
          /> 
          <InputField 
            id="city" 
            type="text" 
            label="Cidade:" 
            value={data.city} 
            onChange={updateFieldHandler} 
            placeholder="Cidade" 
          /> 
          <InputField 
            id="street" 
            type="text" 
            label="Rua:" 
            value={data.street} 
            onChange={updateFieldHandler} 
            placeholder="Rua" 
          /> 
          <InputField 
            id="postalCode" 
            type="text" 
            label="CEP:" 
            value={data.postalCode} 
            onChange={updateFieldHandler} 
            placeholder="CEP" 
          /> 
          <InputField 
            id="phone" 
            type="text" 
            label="Telefone:" 
            value={data.phone} 
            onChange={updateFieldHandler} 
            placeholder="Telefone" 
          /> 
        </div> 
      </div> 
      <div className="mt-6 flex space-x-4"> 
        <Button 
          onClick={() => swiperRef.current?.slidePrev()} 
          label="Anterior" 
        /> 
        <Button type="submit" label="Próximo" disabled={!isFormValid} /> 
      </div> 
    </> 
  ); 
} 
 
export default Address; 