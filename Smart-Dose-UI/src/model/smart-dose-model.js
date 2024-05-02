

export default {
    /*properties that can be persisted*/

    //hardnessData : [{Location:'Ale', Hardness: 3, ID: 1}, {Location: 'Alingsåddds', Hardness:1, ID: 2}],
    hardnessData : [],
    user_location : '',
    status : false,

    setSatus(state){
        this.status = state;
    },
    
}