<template>
 <div class="teams" >
      <div class="teams-item">
        <img class="teamsimg" src="@/assets/团队.svg" @click="itemClick">
        <div class="teams-info" @click="itemClick">
          <span>团队名称：{{teamsItem.teamName}}</span>
          <span class="endid">团队ID：{{teamsItem.teamID}} </span>
          <span class="end">创建者：{{teamsItem.leaderName}} </span>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  name: "TeamsListItem",
  data() {
    return{
    }
  },
  props: {
      teamsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  methods: {
      itemClick() {
        var userL=JSON.parse(sessionStorage.getItem("userL"));
        if(this.teamsItem.leaderID === userL.userID){
          this.$router.push('/teamleader/' + this.teamsItem.teamID)
          // this.$router.push(
          //   {
          //     name:'teamview1',
          //     params:{
          //       id:this.teamsItem.teamID
          //     }
          //   }
          // )
        }
        else{
          this.$router.push('/teammember/' + this.teamsItem.teamID)
          // this.$router.push(
          //   {
          //     name:'teamview2',
          //     params:{
          //       id:this.teamsItem.teamID
          //     }
          //   }
          // )
        }
      }
    }
};
</script>

<style>
  .teams {
    position: relative;
    padding: 10px;
  }
  .teams-item {
    display: flex;
    position: relative;
    border-radius: 20px;
    padding: 5px;
    background-color: #f4f7f8;
  }

  .teamsimg {
    width: 50px;
    padding: 10px;
  }
  .teams-info {
    display: flex;
    font-size: 16px;
    position: relative;
    padding-left: 0;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-left: 20px;
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    text-align: left;
  }
  .teams-info span {
    margin-right: 40px;
  }
  .endid{
    position: absolute;
    right: 170px;
    overflow: hidden;
    text-align: left;
  }
  .end{
    position: absolute;
    right: 0px;
    overflow: hidden;
    text-align: left;
  }

</style>
