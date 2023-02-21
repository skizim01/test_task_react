import {useState} from "react";

const InfoOutput = ({name, img, switcH, colors, width, values}) => {
    const media = window.matchMedia("(max-width: 670px)")
    const [medias, setMedia] = useState(media.matches)
    media.onchange = () =>setMedia(media.matches)

    return (
        <div className={'infoOutputContainer'} >
            <div className="titleImg">
                <div>{name}</div>
                <div><img src={img} alt={name}/></div>
                {switcH &&
                    <div>
                        <span>{switcH[0]}</span>
                        <label className="switch">
                            <input type="checkbox" id="type" onChange={(event) =>switcH[3](event.target.checked)}/>
                            <span className="slider round"></span>
                        </label>
                        <span>{switcH[1]}</span>
                    </div>}

            </div>
            <div className="histogram">

                <div className="histogramItem">
                    <div className="itemValue" company="bunny" style={{backgroundColor: colors,
                        [medias?"height":"width"]: width,
                        [medias?"width":"height"]:"20px" }} >
                    </div>
                    <div className="result" id="bunnyResult">{values.toFixed(2)}$</div>
                </div>
                <div style={{height: "17px"}}></div>
            </div>
        </div>

    )
}

export default InfoOutput