<template>
 <div class="row">
    <div class="row col-md-12">
                <div class="form-group col-md-4">
                    <label htmlFor="FinalRepotFrom"><b>Report from <br/>(* for PCR set day before Sample)</b></label>
                    <div class="form-group">
                        <div v-for="(item, index) in DateTimeItems" :key="`FinalReportFrom-${index}`">
                            <input  class="form-check-input" type="radio" :id="item.text"
                                :value="item.value" v-model="FinalReportFrom"/> 
                            <label :for="item.text">{{item.text}}</label> 
                        </div> 
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <label htmlFor="SampleTakenAt"><b>Sample from</b></label>
                    <br/>
                    <br/>
                    <div class="form-group">
                        <div v-for="(item, index) in DateTimeItems" :key="`SampleTakenAt-${index}`">
                            <input class="form-check-input" type="radio" :id="item.text" :value="item.value"
                                v-model="SampleTakenAt" /> 
                            <label :for="item.text">{{item.text}}</label> 
                        </div> 
                    </div>
                </div>
                <div class="form-group col-md-4">
                    <label htmlFor="SampleTakenAtTime"><b>Sample time</b></label>
                    <input type="text" maxlength="8" class="form-control" v-model="SampleTakenAtTime" name="SampleTakenAtTime" id="SampleTakenAtTime" placeholder="Time" />
                </div>
            </div>

 </div>
</template>
<script>
function formatDate(date) {
    var d = new Date();
        d.setDate(d.getDate() + date);
        var month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}
export default {

  data() {
    return {
        FinalReportFrom : formatDate(0),
        SampleTakenAt : formatDate(0),
        SampleTakenAtTime : ''
    }
  },
  computed: {
      DateTimeItems: function () {
        return  [
            { text: 'Today+3', value:formatDate(3)},
            { text: 'Today+2', value:formatDate(2)},
            { text: 'Today+1', value:formatDate(1)},
            { text: 'Today', value:formatDate(0)},
            { text: 'Today-1', value:formatDate(-1)},
            { text: 'Today-2', value:formatDate(-2)},
            { text: 'Today-3', value:formatDate(-3)}
        ]
      }
    }
};
</script>