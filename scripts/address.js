export class AddressClass {
    constructor(){
        this.key = process.env.API_KEY;
        this.ipURI = "https://geo.ipify.org/api/v2/country,city";
    }
    async updateDetails(ip){
        const ipDets = await this.getDetails(ip);
        return{
            ipDets : ipDets
        }
    };
    async getDetails(ip){
        const query = `?apiKey=${this.key}&ipAddress=${ip}`;
        const response = await fetch(this.ipURI + query);
        const data = await response.json();
        return data;
    }
}
