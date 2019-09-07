<template>
    <div class="wrap">
        <div class="logo">
            <h1>404</h1>
            <p>Sorry This was deadlink - Page not Found</p>
            <div class="sub">
                <p><router-link to="/index">Go Back to Home</router-link></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            hides:false
        }
    },
    mounted: function (x){
        this.$store.dispatch('showup',this.hides);
    }
}
</script>

<style scope>
    .wrap{
        font-family: 'Metal Mania', cursive;
        background:skyblue;
        margin:0 auto;
        width:100%;
        height:100%;
    }
    .logo{
        padding-top:200px;
    }
    .logo h1{
        font-size:200px;
        color:yellow;
        text-align:center;
        margin-bottom:1px;
        text-shadow:1px 1px 6px #555;
    }   
    .logo p{
        color:white;
        font-size:20px;
        margin-top:1px;
        text-align:center;
    } 
    .logo p span{
        color:lightgreen;
    }  
        
    .sub a{
        color:yellow;
        background:#06afd8;
        text-decoration:none;
        padding:5px;
        font-size:13px;
        font-family: arial, serif;
        font-weight:bold;
    }   
</style>
