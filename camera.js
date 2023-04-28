import * as React from 'react' 
import {Button , Veiw , Image  ,Platform } from 'react-native' 
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class PickImage extends React.Component{
    state = {
        image:null , 
    }


render() {
    let {image} = this.state;
    return(
        <Veiw style = {{flex:1 , alignItems: "center" , justifycontent:"center"}}>
            <Button 
            title = "pick an imgae from camera roll "
            onPress={this._pickImage}/>
        </Veiw>
    );
}

getPermissionsAsync = async() =>{
    if (Platform.OS !=="web"){
        const {status} = await Permissions.askAsnyc(Permissions.CAMERA_ROLL);
        if(status !== "granted"){
            alert('sorry!!')

        }

    }
};
componentDidMount(){
    this.getPermissionsAsync();
}

_pickImage = async ()=> {
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypesOption.All , 
            allowsEditing: true , 
            aspect: [4,3],
            quality:1 ,

        });
        if(!result.cancelled){
            this.setState({image:result.data});
            console.log(result.uri)
            this.uploadImage(result.uri);

        }
    } catch (E) {
        console.log(E);
    }
}

uploadImage = async (uri) => {
    const data = new FormData()
    let filename = uri.split("/")[uri.split("/").length - 1 ]
    let type = 'image/${uri.split(".")[uri.split(".").length - 1]}'
    const fileToUpload = { 
        uri:uri , 
        name:filename , 
        type:type ,
    } 
    data.append("digit" , fileToUpload)
    fetch (" " , {
        method :POST , 
        body : data , 
        headers: {
           " content-type" : "mutlipart/form-data" , 
        }
    })
    .then((response) => response.json())
    .then((result) =>  {
        console.log("success: " , result)
    })
    .catch((error) => {
        console.error("error" , error)
    })
}


};