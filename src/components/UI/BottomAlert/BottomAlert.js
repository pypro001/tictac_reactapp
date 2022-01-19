import './BottomAlert.css'

 const BottomAlert = (props)=>{
    const msg = props.msg;
   if(msg){
    return (
        <div className="bottom-alert">
            <div className="alert-msg">{props.msg}</div>
        </div>
    )
   }else{
       return <div></div>;
   }
}
export default BottomAlert;