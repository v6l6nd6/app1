import { ReactElement } from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps, WrappedFieldProps, WrappedFieldsProps } from "redux-form";
import fc from "./FormsControl.module.css";

type renderFieldType = {
    meta: WrappedFieldMetaProps,
    input: ReactElement<React.Component, React.FC> | null
  }

export const FormForControls:React.FC<any> = (Element):any=>({input,meta,...props}:renderFieldType)=>{
    const hasError = meta.touched && meta.error;
return (
    <div className={fc.formControl + " " + (hasError ? fc.error : "")}>
        <Element {...props} {...input} />
        {hasError && <span>{meta.error}</span>}
    </div>
)
}

