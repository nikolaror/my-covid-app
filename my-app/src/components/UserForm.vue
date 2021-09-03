<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12 mrgnbtm">
        <h2>Test data</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" class="form-control" v-model="FirstName" name="FirstName" id="FirstName" aria-describedby="emailHelp" placeholder="First Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" class="form-control" v-model="LastName" name="LastName" id="LastName" placeholder="Last Name" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="streetName">Street</label>
                        <input type="text" class="form-control" v-model="Street" name="Street" id="Street" placeholder="Street" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="houseNumber">Last Name</label>
                        <input type="text" class="form-control" v-model="HouseNumber" name="HouseNumber" id="HouseNumber" placeholder="House Number" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="postcode">Postcode</label>
                        <input type="text" class="form-control" v-model="Postcode" name="Postcode" id="Postcode" placeholder="Postcode" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="City">City</label>
                        <input type="text" class="form-control" v-model="City" name="City" id="City" placeholder="City" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                    <div class="form-check">
                    <input class="form-check-input" type="radio" v-model="PcrSex" value="male" id="sexMale" checked>
                    <label class="form-check-label" for="sexMale">
                        Male
                    </label>
                    </div>
                    <div class="form-check ">
                    <input class="form-check-input" type="radio" v-model="PcrSex" value="female" id="sexFemale">
                    <label class="form-check-label" for="sexFemale">
                        Female
                    </label>
                    </div>
                    </div>
                    <div class="form-group col-md-6">
                       <label htmlFor="birthDate">Birth Date</label>
                        <input type="text" class="form-control" v-model="BirthDate" name="BirthDate" id="BirthDate"  placeholder="20.05.1985" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="text" class="form-control" v-model="Email" name="Email" id="Email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div class="form-group col-md-6">
                  
                               <label htmlFor="mobileNumber">Mobile Number</label>
                        <input type="text" class="form-control" v-model="MobileNumber" name="MobileNumber" id="MobileNumber"  placeholder="Mobile Number" />
                    </div>
                </div>
                 <div class="row">
                    <div class="form-group col-md-6">
                       <label htmlFor="passport">Passport <b>(*only for PCR)</b></label>
                        <input type="text" class="form-control" v-model="Passport" name="Passport" id="Passport" placeholder="Passport" />
                    </div>
                </div>
            <div class="col-md-12">
                <ReportForm @createUser="userCreate($event)" ref="report"/>
            </div>
                 <div class="row">
                    <div class="form-group col-md-6">
                    <button type="button" @click="createFast" class="btn btn-danger">Get FAST</button>
                    </div>
                    <div class="form-group col-md-6">
                    <button type="button" @click="createPcr" class="btn btn-danger">Get PCR</button>
                    </div>
                </div>
                                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li class="text-danger" v-for="(error, index) in errors" :key="`error-${index}`">{{ error }}</li>
                    </ul>
                </p>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import ReportForm from './ReportForm.vue'

export default {
  name: 'UserForm',
  data() {
    return {
        errors:[],
        FirstName: '',
        LastName: '',
        PcrSex: 'male',
        get Sex() { return this.PcrSex==='male'?'Männlich ':'Weiblich '; },
        Street: '',
        HouseNumber: '',
        Postcode: '',
        City: '',
        BirthDate: '',
        MobileNumber: '',
        Email: '',
        Passport: ''
    }
  },
  methods: {
      checkForm: function (e) {
          console.log(this.FirstName);
      e.preventDefault();
      this.errors = [];
      if (this.FirstName && this.LastName && this.$refs.report.SampleTakenAtTime) {
        return true;
      }

      if (!this.FirstName) {
        this.errors.push('Name required.');
      }
      if (!this.LastName) {
        this.errors.push('Last name required.');
      }
      if (!this.$refs.report.SampleTakenAtTime) {
        this.errors.push('Time is required.');
      }
    },
      createFast: function (e) {
          this.checkForm(e);
        if(this.errors.length)
          {
              return;
          }
          const payload = {
            FirstName: this.FirstName,
            LastName: this.LastName,
            Sex: this.Sex,
            PcrSex: this.PcrSex,
             Street: this.Street,
             HouseNumber: this.HouseNumber,
             Postcode: this.Postcode,
             City: this.City,
             BirthDate: this.BirthDate,
             MobileNumber: this.MobileNumber,
             Email: this.Email,
             Passport: this.Passport,
             FinalReportFrom:this.$refs.report.FinalReportFrom,
             SampleTakenAt:this.$refs.report.SampleTakenAt,
             SampleTakenAtTime:this.$refs.report.SampleTakenAtTime
          }
          this.$emit('createFast', payload)
      },
      createPcr: function (e) {
          this.checkForm(e);
          if(this.errors.length)
          {
              return;
          }
          const payload = {
            FirstName: this.FirstName,
            LastName: this.LastName,
            Sex: this.Sex,
            PcrSex: this.PcrSex,
             Street: this.Street,
             HouseNumber: this.HouseNumber,
             Postcode: this.Postcode,
             City: this.City,
             BirthDate: this.BirthDate,
             MobileNumber: this.MobileNumber,
             Email: this.Email,
             Passport: this.Passport,
             FinalReportFrom:this.$refs.report.FinalReportFrom,
             SampleTakenAt:this.$refs.report.SampleTakenAt,
             SampleTakenAtTime:this.$refs.report.SampleTakenAtTime
          }
          this.$emit('createPcr', payload)
      }
  },
  components:{
      ReportForm
  }
}
</script>