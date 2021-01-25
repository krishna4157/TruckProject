// import { changeLanguage } from '../actions/changeLanguage';
import { Formik } from 'formik';
import { Button, Text } from 'native-base';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';


const keyInput1 = React.createRef();
const keyInput2 = React.createRef();
const keyInput3 = React.createRef();
const keyInput4 = React.createRef();
const keyInput5 = React.createRef();
const keyInput6 = React.createRef();
class Pin extends React.Component {
    state = {
        noOfPins: 0,
        error: '',
       
    }

    setBackgroundColor = (value, index) => {
        if (value != '') {
            return
        }

    }

    getInitialValues = () => {
        const { noOfInput, round } = this.props;
        const pin4 = {
            'input1': '',
            'input2': '',
            'input3': '',
            'input4': '',
        }

        const pin6 = {
            'input1': '',
            'input2': '',
            'input3': '',
            'input4': '',
            'input5': '',
            'input6': '',
        }

        if (noOfInput > 4) {
            return pin6;
        } else {
            return pin4;
        }
    }

    render() {
        const { noOfInput, round, fillColor, getPin, errorMessage, wrongPinMessage, wrongPinColor,pin,newPin } = this.props;
        const { noOfPins, backgroundColor, error } = this.state;
        var inputBoxes = noOfInput;
        var array = [];
        for (var i = 0; i < inputBoxes; i++) {
            array.push(i);
        }
        var oldPin = pin;

        const arr = [keyInput1, keyInput2, keyInput3, keyInput4];

        return (
            <Formik
                initialValues={this.getInitialValues()}

                onSubmit={(values, { setSubmitting, setErrors, setStatus, resetForm }) => {
                    setTimeout(() => {
                        //   alert(JSON.stringify(values));
                        var pin;
                        if(noOfInput==6){
                        pin = `${values.input1}${values.input2}${values.input3}${values.input4}${values.input5}${values.input6}`;
                        } else {
                            pin = `${values.input1}${values.input2}${values.input3}${values.input4}`;
                        }
                        if(pin.length==0){
                            this.setState({
                                error : 'Please enter Pin.'
                            });
                            setTimeout(() => {
                                resetForm({});
                                this.setState({
                                    error: ''
                                });
                                keyInput1.current.focus();
                            }, 2000);
                        } else
                        if (pin.length == noOfInput) {
                            if(newPin){
                                getPin(pin);
                                resetForm({});
                                keyInput1.current.focus();
                            } else
                            if (pin == oldPin) {
                                getPin(pin);
                                resetForm({});
                                keyInput1.current.focus();
                                
                            } else {
                                this.setState({
                                    error: wrongPinMessage
                                });

                                setTimeout(() => {
                                    resetForm({});
                                    this.setState({
                                        error: ''
                                    });
                                    keyInput1.current.focus();

                                }, 2000);
                            }
                        } else {
                            this.setState({
                                error: errorMessage
                            });
                            setTimeout(() => {
                                resetForm({});
                                this.setState({
                                    error: ''
                                })
                                keyInput1.current.focus();

                            }, 2000);

                        }
                        keyInput1.current.clear();
                        keyInput2.current.clear();
                        keyInput3.current.clear();
                        keyInput4.current.clear();
                        keyInput5.current.clear();
                        keyInput6.current.clear();
                        setSubmitting(false);

                    }, 500);
                }}>
                {props => {
                    const {
                        setFieldValue, setValues
                    } = props;

                    return (
                        <View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 20 }} >

                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }}  onPress={() => {
                                        this.setState({
                                            error: ''
                                        })
                                        props.setFieldValue('input1', '');
                                        props.setFieldValue('input2', '');
                                        props.setFieldValue('input3', '');
                                        props.setFieldValue('input4', '');
                                        props.setFieldValue('input5', '');
                                        props.setFieldValue('input6', '');
                                        keyInput1.current.focus();
                                        keyInput1.current.clear();
                                        keyInput2.current.clear();
                                        keyInput3.current.clear();
                                        keyInput4.current.clear();
                                        keyInput5.current.clear();
                                        keyInput6.current.clear();

                                    }}>
                                        </TouchableOpacity>
                                        <TextInput
                                        keyboardType={'numeric'}
                                            // onKeyPress={({ nativeEvent }) => {
                                            //     this.setState({
                                            //         error: ''
                                            //     })
                                            //     console.log(nativeEvent);
                                            //     if (nativeEvent.key === 'Backspace') {
                                            //         keyInput1.current.focus();
                                            //         props.setFieldValue('input1', '');
                                            //     } else {
                                            //         props.setFieldValue('input1', nativeEvent.key);
                                            //         keyInput2.current.focus();
                                            //     }
                                            // }}

                                            // onChangeText={(value)=>{
                                            //     console.log(nativeEvent)
                                            //     props.setFieldValue('input1', value);
                                            //     keyInput2.current.focus();

                                            // }
                                            // }
                                            clearTextOnFocus={true}
                                            onFocus={()=>{
                                                // console.log('hell'+props.getFieldProps('input1').value.text);
                                               if(props.getFieldProps('input1').value.text!=undefined){
                                                keyInput1.current.focus();
                                                keyInput1.current.clear();
                                                props.setFieldValue('input1', '');
                                               }
                                            }}
                                            onChange={({ nativeEvent }) => {
                                                console.log('no hell');
                                                this.setState({
                                                    error: ''
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput1.current.focus();
                                                    props.setFieldValue('input1', '');
                                                } else if (nativeEvent.text==""){
                                                    keyInput1.current.focus();
                                                    props.setFieldValue('input1', '');
                                                    
                                                } else {
                                                    props.setFieldValue('input1', nativeEvent.text);
                                                    keyInput2.current.focus();
                                                }
                                            }}
                                            // value={props.handleChange}
                                            autoFocus={true}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor, backgroundColor: props.values.input1 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput1}
                                            // value={keyInput1}
                                            maxLength={1}

                                        />
                                    
                                </View>

                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }} onPress={() => {
                                        this.setState({
                                            error: ''  
                                        })
                                        props.setFieldValue('input2', '');
                                        props.setFieldValue('input3', '');
                                        props.setFieldValue('input4', '');
                                        props.setFieldValue('input5', '');
                                        props.setFieldValue('input6', '');
                                        keyInput2.current.focus();
                                        keyInput2.current.clear();
                                        keyInput3.current.clear();
                                        keyInput4.current.clear();
                                        keyInput5.current.clear();
                                        keyInput6.current.clear();

                                    }}>
                                        </TouchableOpacity>
                                        <TextInput
                                        keyboardType={'numeric'}

onFocus={()=>{
    // console.log('hell'+props.getFieldProps('input1').value.text);
   if(props.getFieldProps('input2').value.text!=undefined){
    keyInput1.current.focus();
    keyInput1.current.clear();
    props.setFieldValue('input2', '');
   }
}}
                                            
                                            onChange={({ nativeEvent }) => {
                                                console.log(nativeEvent);
                                                this.setState({
                                                    error: ''
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput1.current.focus();
                                                    props.setFieldValue('input2', '');
                                                } else {
                                                    props.setFieldValue('input2', nativeEvent.text);
                                                    keyInput3.current.focus();
                                                }
                                            }}
                                            // autoFocus={true}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor, backgroundColor: props.values.input2 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput2}
                                            maxLength={1}

                                        />
                                    
                                </View>

                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }} onPress={() => {
                                        this.setState({
                                            error: ''
                                        })
                                        props.setFieldValue('input3', '');
                                        props.setFieldValue('input4', '');
                                        props.setFieldValue('input5', '');
                                        props.setFieldValue('input6', '');
                                        keyInput3.current.focus();
                                        keyInput3.current.clear();
                                        keyInput4.current.clear();
                                        keyInput5.current.clear();
                                        keyInput6.current.clear();

                                    }}>
                                        </TouchableOpacity>
                                        <TextInput

keyboardType={'numeric'}

onFocus={()=>{
    console.log('hell'+props.getFieldProps('input1').value.text);
   if(props.getFieldProps('input3').value.text!=undefined){
    keyInput1.current.focus();
    keyInput1.current.clear();
    props.setFieldValue('input3', '');
   }
}}
                                            
                                            onChange={({ nativeEvent }) => {
                                                console.log(nativeEvent);
                                                this.setState({
                                                    error: ''
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput2.current.focus();
                                                    props.setFieldValue('input3', '');
                                                } else {
                                                    props.setFieldValue('input3', nativeEvent.text);
                                                    keyInput4.current.focus();
                                                }
                                            }}
                                            // autoFocus={true}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor,  backgroundColor: props.values.input3 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput3}
                                            maxLength={1}

                                        />
                                   
                                </View>

                                <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }} onPress={() => {
                                        this.setState({
                                            error: ''
                                        })
                                        props.setFieldValue('input4', '');
                                        props.setFieldValue('input5', '');
                                        props.setFieldValue('input6', '');
                                        
                                        if(noOfInput > 5){
                                        keyInput5.current.focus();
                                        keyInput5.current.clear();
                                        keyInput6.current.clear();
                                        
                                    } else {
                                            keyInput4.current.focus();
                                            keyInput4.current.clear();
                                           
                                        }
                                    }}>
                                        </TouchableOpacity>
                                        <TextInput
                                                                                keyboardType={'numeric'}

                                                                                onFocus={()=>{
                                                                                    // console.log('hell'+props.getFieldProps('input1').value.text);
                                                                                   if(props.getFieldProps('input4').value.text!=undefined){
                                                                                    keyInput1.current.focus();
                                                                                    keyInput1.current.clear();
                                                                                    props.setFieldValue('input4', '');
                                                                                   }
                                                                                }}
                                                                                                                            
                                            onChange={({ nativeEvent }) => {
                                                this.setState({
                                                    error: ''
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput3.current.focus();
                                                    props.setFieldValue('input4', '');
                                                } else {
                                                    props.setFieldValue('input4', nativeEvent.text);
                                                    if(noOfInput > 5){
                                                        keyInput5.current.focus();
                                                        keyInput5.current.clear();
                                                        keyInput6.current.clear();
                                                        } else {
                                                            keyInput4.current.focus();
                                                            keyInput4.current.clear();
                                                        }
                                                }
                                            }}
                                            // autoFocus={true}
                                            autoFocus={false}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor, backgroundColor: props.values.input4 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput4}
                                            maxLength={1}

                                        />
                                    
                                </View>
                                {noOfInput > 4 && <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }}  onPress={() => {
                                        this.setState({
                                            error: ''
                                        })
                                        props.setFieldValue('input5', '');
                                        props.setFieldValue('input6', '');
                                        keyInput5.current.focus();
                                        keyInput5.current.clear();
                                        keyInput6.current.clear();

                                    }}>
                                        </TouchableOpacity>
                                        <TextInput

keyboardType={'numeric'}

onFocus={()=>{
    console.log('hell'+props.getFieldProps('input5').value.text);
   if(props.getFieldProps('input5').value.text!=undefined){
    keyInput5.current.clear();
    keyInput4.current.focus();
    props.setFieldValue('input5', '');
   }
}}
                                            
                                            onChange={({ nativeEvent }) => {
                                                this.setState({
                                                    error: ''
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput4.current.focus();
                                                    props.setFieldValue('input5', '');
                                                } else {
                                                    props.setFieldValue('input5', nativeEvent.text);
                                                    keyInput6.current.focus();
                                                }
                                            }}
                                            // autoFocus={true}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor,  backgroundColor: props.values.input5 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput5}
                                            maxLength={1}


                                        />
                                   
                                </View>}
                                {noOfInput > 4 && <View style={{ height: 50, width: 50, borderWidth: 1, borderColor: 'black', borderRadius: round ? 30 : 5 }}>
                                    <TouchableOpacity style={{ height: 50, width: 50, elevation: 100, zIndex: 1 }}  onPress={() => {
                                        this.setState({
                                            error: ''
                                        })
                                        props.setFieldValue('input6', '');
                                        keyInput6.current.focus();
                                        keyInput6.current.clear();

                                    }}>
                                        </TouchableOpacity>
                                        <TextInput

keyboardType={'numeric'}

onFocus={()=>{
    console.log('hell'+props.getFieldProps('input5').value.text);
   if(props.getFieldProps('input6').value.text!=undefined){
    keyInput6.current.clear();
    keyInput5.current.focus();
    props.setFieldValue('input6', '');
   }
}}
                                            
                                            onChange={({ nativeEvent }) => {
                                                console.log(nativeEvent);
                                                this.setState({
                                                    error: ''  
                                                })
                                                if (nativeEvent.text === "") {
                                                    keyInput5.current.focus();
                                                    props.setFieldValue('input6', '');
                                                } else {
                                                    props.setFieldValue('input6', nativeEvent.text);
                                                    keyInput6.current.focus();
                                                }
                                            }}
                                            // autoFocus={true}
                                            secureTextEntry={true}
                                            style={{ position:'absolute',zIndex:-1,fontSize: 0, height: 50, textDecorationColor: wrongPinColor,  backgroundColor: props.values.input6 != '' && error == '' ? fillColor : error != '' ? wrongPinColor : 'transparent', borderRadius: round ? 50 : 5, width: 50, textAlign: 'center', alignSelf: 'center', alignItems: 'center', textAlignVertical: 'center' }} blurOnSubmit={false}
                                            ref={keyInput6}
                                            maxLength={1}


                                        />
                                   
                                </View>}

                            </View>
                            <Text style={{ color: wrongPinColor, textAlign: 'center' }}>{this.state.error}</Text>
                            <View style={{ marginTop: '20%', alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', padding: 10 }}>
                                <Button onPress={props.handleSubmit} style={{ borderRadius: 30 }}>
                                    <Text style={{ padding: 20 }}>VERIFY</Text>
                                </Button>
                            </View>
                        </View>
                    );
                }}
            </Formik>);
    }
}
export default Pin