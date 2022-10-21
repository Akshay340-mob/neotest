import { firebase } from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import { ErrorText } from '../../components/CustomText';
import HOC from '../../components/HOC';
import Input from '../../components/Input';
import { PlaceHolder } from '../../constants/AppContants';
import { RootStackParamList } from '../../constants/types';
import { saveUserDataToStarage } from '../../helpers/SaveToStorage';
import { validator } from '../../helpers/Validator';
import { SET_USER } from '../../store/actions/Actions';
import { useAppDispatch } from '../../store/hooks';

import HOCSpinner from '../../components/HOCSpinner';

const ViewWithSpinner = HOCSpinner(View);

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>
let defaultErr = { val: false, msg: "" }
const Register: React.FC<RegisterScreenProps> = (props) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState("")
    const [error, setError] = useState(defaultErr)
    const dispatch = useAppDispatch()
    const [loading, setIsLoading] = useState<boolean>(false)

    const onchange = (text: string, type: string) => {
        setError(defaultErr)
        if (type === PlaceHolder.EMAIL)
            setEmail(text);
        else if (type === PlaceHolder.PASSWORD)
            setPassword(text);
        else if (type === PlaceHolder.NAME)
            setName(text);
    }

    const signUp = async () => {

        if (email.length > 0 && password.length > 0 && name.length > 0) {
            let isValid = validator(email, password, name);
            if (!isValid.val)
                setError({ val: !isValid.val, msg: isValid.msg })

            if (isValid.val) {
                setIsLoading(true);
                try {
                    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    const user = response.user
                    if (user) {
                        await user.updateProfile({ displayName: name });
                        const userInfo = {
                            displayName: name,
                            email: user.email,
                            uid: user.uid
                        }
                        saveUserDataToStarage(userInfo);
                        dispatch({ type: SET_USER, payload: userInfo })
                    }
                } catch (error: any) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        else setError({ val: true, msg: "Please Fill Up the Details" })

    }


    return (<HOC>
        <ViewWithSpinner
            spinner={loading}
            style={styles.container}
        >
            <>
                {error.val ? <ErrorText title={error.msg} /> : null}
                <Input value={name} placeholder={PlaceHolder.NAME} onChangeText={onchange} />
                <Input value={email} placeholder={PlaceHolder.EMAIL} onChangeText={onchange} />
                <Input value={password} placeholder={PlaceHolder.PASSWORD} onChangeText={onchange} />
                <Button title="Register" onPress={signUp} />
            </>
        </ViewWithSpinner>


    </HOC>)
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },

})

export default Register;