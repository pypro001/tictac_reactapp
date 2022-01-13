import './Backdrop.css'

const backdrop = (props)=>{
    return props.backdropShow ? <div className="Backdrop"></div>:null
}

export default backdrop;