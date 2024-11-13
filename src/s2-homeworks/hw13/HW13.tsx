import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')
    const [loadingButton, setLoadingButton] = useState<null | string>(null)

    const send = (x: boolean | null | undefined, buttonId: string) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://samurai.it-incubator.io/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        setLoadingButton(buttonId)

        axios
            .post(url, {success: x})
            .then((res) => {
                setCode('Код 200!')
                setImage(success200)
                // дописать
                setText(res.data.errorText)
                setInfo(res.data.info)


            })
            .catch((e) => {
                // дописать
                if (e.response.status === 0) {
                    setImage(errorUnknown)
                    setCode(`Error!`)
                    setText('Network error');
                    setInfo('Error')
                } else {
                    setCode(`Ошибка ${e.response.status}!`)
                    setText(e.response.data.errorText);
                    setInfo(e.response.data.info)
                    setImage(
                        e.response?.status === 400
                            ? error400
                            : e.response?.status === 500
                                ? error500 : ''
                    );
                }

            })
            .finally(() => {
                setLoadingButton(null)
            })
    }
    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true, 'true')}
                        xType={'secondary'}
                        // дописать

                        disabled={loadingButton === 'true'}
                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false, 'false')}
                        xType={'secondary'}
                        // дописать
                        disabled={loadingButton === 'false'}

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined, 'undefined')}
                        xType={'secondary'}
                        // дописать
                        disabled={loadingButton === 'undefined'}
                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null, 'null')} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        // дописать
                        disabled={loadingButton === 'null'}
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
