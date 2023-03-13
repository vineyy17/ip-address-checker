class Address{
    constructor(){
        this.key = "at_w1ysWLauoex14Ad27KkivY7UK0dvz";
        this.ipURI = "https://geo.ipify.org/api/v2/country,city";
    }
    async updateDetails(ip){
        const ipDets = await this.getDetails(ip);
        return{
            ipDets : ipDets
        }
    }
    async getDetails(ip){
        const query = `?apiKey=${this.key}&ipAddress=${ip}`;
        const response = await fetch(this.ipURI + query);
        const data = await response.json();
        return data;
    }
}
