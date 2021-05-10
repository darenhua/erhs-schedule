async function fetch_calender(){
    let response = await fetch('calender.json');
    let json = await response.json();
    return json;
}

(async function main(){
    const greeting_elem = document.getElementById("main-greeting");
    const day_elem = document.getElementById("day");
    const time_elem = document.getElementById("clock-time");
    const month_elem = document.getElementById("month");
    const date_elem = document.getElementById("date");
    const ampm_elem = document.getElementById("am-or-pm");
    const slider = document.getElementsByClassName("knobe");
    const classes = document.getElementsByClassName("class-label");
    const links = document.getElementsByClassName("card");

    const date_str = {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        greeting: ["Morning", "Afternoon", "Evening"],
        period: ["Morning", "Night"]
    }

    const zooms = ["https://us02web.zoom.us/j/87810428119?pwd=c3NSdFg4cldDbUpCNStCVGN4ZXA2UT09",
                  "javascript:;",
                  "https://us02web.zoom.us/j/89437896053?pwd=Vk0vRVJBOVhreUg2OXFkTlhINlpNQT09",
                  "https://us02web.zoom.us/j/83036949687?pwd=QUk2STI3aDdVeWFhQzFXQk1JS2ZEQT09",
                  "https://us02web.zoom.us/j/97692588019?pwd=K0xleVRTcG1UTC81QWZkL2hkVU5kZz09",
                  "javascript:;",
                  "https://us02web.zoom.us/j/84097318078?pwd=eGpsZmQ1ampXMmdQUUc1aE1LeUJIQT09",
                  "https://us02web.zoom.us/j/94822367708?pwd=a0ZwL3d0bk4wZ0s1eWV4bnU4TWFRQT09",
                  "https://us02web.zoom.us/j/87644268812?pwd=T0tJaXl5VGdqeHA5WUpvdUp5Skwvdz09"
                 ]                   
    
    const class_names = ["Gym", "Break", "Gov", "Calc", "CT", "Break", "Lit", "Phys", "DMath"]
    

    const adv_zoom = "https://us02web.zoom.us/j/87442795997?pwd=MkU4RVY2ZFhPdGQvWDVNMy9RK0FXQT09";

                
    let calender = await fetch_calender();

    [links_updated, sgi] = update_daily();
    setInterval(update_daily, 6 * 60 * 60 * 1000);
    function update_daily() {
        let date_obj = new Date();
        let month = date_obj.getMonth();
        let day = date_obj.getDay();
        let date = date_obj.getDate();
        month_elem.innerHTML = date_str.months[month];
        day_elem.innerHTML = date_str.days[day];
        date_elem.innerHTML = date;
        let [day_classes, advisory, sgi] = todays_classes();
        let i;

        if (day_classes === "day1"){
            for (i = 0; i < 5; i++) {
                classes.item(i).innerHTML = class_names[i];
                links.item(i).href = zooms[i];
            }
            if (day == 1){
                classes.item(4).innerHTML = "Break";
                links.item(4).href = "javascript:;";    
            }
            classes.item(5).href = "javascript:;";
        } else if (day_classes === "day2"){
            for (i = 0; i < 5; i++) {
                if (i === 2 && advisory){
                    classes.item(i).innerHTML = "Adv";
                    links.item(i).href = adv_zoom;    
                    continue;
                } else if (i === 2 && !advisory){
                    classes.item(i).innerHTML = "Break";
                    links.item(i).href = "javascript:;";    
                    continue;
                }
                if (i < 2){
                    classes.item(i).innerHTML = class_names[i+5];
                    links.item(i).href = zooms[i+5];    
                } else{
                    classes.item(i).innerHTML = class_names[i+4];
                    links.item(i).href = zooms[i+4];    

                }
            }
            classes.item(5).href = "javascript:;";
        }

        

        //bug- reset the sgi inserted cards (unfin)
        if (sgi){
            let sgi_temps = document.getElementsByClassName("sgi").parentElement;
            if (sgi_temps) {
                sgi_temps.remove();

            }
            for (i=0; i<sgi.length; i++) {
                insert_card();
            }
            //get elements again because added new class
        }
        let classes_updated = document.getElementsByClassName("class-label");
        let links_updated = document.getElementsByClassName("card");
        if (sgi){
            for (i=0; i<sgi.length; i++) {
                classes_updated.item(i+6).innerHTML = class_names[sgi.charAt(i)-1];
                links_updated.item(i+6).href = zooms[sgi.charAt(i)-1];
    
            }
    
        }
        return [links_updated, sgi];


        function insert_card() {
            const last_card = document.getElementById("card-l");
            last_card.id = "";
            last_card.insertAdjacentHTML('afterend', '<a target="_blank" class="card" id="card-l"> <div id="gym-crop" class="sgi"> <img src="dumbbell.svg" alt="dumbbell" id="gym-graphic"> </div> <h5 class="class-label">SGI-2</h5> </a>')
        }
        function todays_classes(){
            var day_classes;
            for (const week of calender) {
                for (const cal_day of week) {
                if (cal_day.length <= 1){
                    continue;
                    //set css to glow
                }else{
                    let num1 = cal_day.charAt(0);
                    let num2 = cal_day.charAt(1);
                    var cal_date = "";
                    if (!isNaN(num1)){
                        cal_date = cal_date + num1;
                    }
                    if (!isNaN(num2)){
                        cal_date = cal_date + num2;
                    }
                }    
                if (cal_date == date) {
                    if (cal_day.includes("Periods 1-5")){
                        day_classes = "day1";
                    } else if (cal_day.includes("Periods 6-9")){
                        day_classes = "day2";
                    } else {
                        //set css to glow
                        day_classes = "na";
                    }
                    var advisory = cal_day.includes("Advisory") ? true : false;
                    if (cal_day.includes("SGI")){
                        let sgi_index = cal_day.indexOf("SGI");
                        let sgi_str = cal_day.slice(sgi_index);
                        var sgi = "";
                        for (const char of sgi_str) {
                            if (!isNaN(char) && char!== " "){
                                sgi = sgi + char;
                            }
                        }    
                    }
                }                
                }
            }    
            return [day_classes, advisory, sgi];
        }
    }
    update_s();
    setInterval(update_s, 1000);

    function update_s() {
        let date_obj = new Date();
        let hour = date_obj.getHours();
        let min = date_obj.getMinutes();
        let container = document.getElementsByClassName("container");
        let my_class;
        let form_hr =  ((hour + 11) % 12 + 1);
        let form_min = min > 9 ? min : "0" + min;

        greeting_elem.innerHTML = hour > 11 ? date_str.greeting[2] : date_str.greeting[0];
        greeting_elem.innerHTML = hour === 11 ? date_str.greeting[1] : greeting_elem.innerHTML;    
        ampm_elem.innerHTML =  hour > 11 ? date_str.period[1] : date_str.period[0];
        time_elem.innerHTML = form_hr + ":" + form_min;
        reset_styles();
        my_class = current_class();
        switch(my_class) {
            case 0:
                slider[0].style.width = "55px";
                break;
            case 1:
                slider[0].style.width = "200px";
                break;
            case 2:
                slider[0].style.width = "340px";
                break;
            case 3:
                slider[0].style.width = "480px";
                break;
            case 4:
                slider[0].style.width = "630px";
                break;
            case 5:
                slider[0].style.width = "770px";
                break;
            case 6:
                slider[0].style.width = "920px";
                break;
            case 7:
                slider[0].style.width = "1060px";
                break;
            default:
                slider[0].style.width = "0px";
          }
          
        function reset_styles(){
            for (i = 0; i < links_updated.length; i++) {
                links[i].style.background = "linear-gradient(180deg,rgba(255, 255, 255, 0.5) 0%,rgba(255, 255, 255, 0) 100%),#0e0f2f";
            }
            container[0].id = "container-style1";
        }
        function current_class(){
            let classes_times = ['08:30:00','09:15:00','10:00:00','10:45:00','11:30:00','12:15:00', '13:20:00'];
            let normal_schedule = false;
            let class_is_over = true;
            let my_class = 0;
            for (i = 0; i < classes_times.length-1; i++) {
                let startTime = classes_times[i];
                let endTime = classes_times[i+1];
                startDate = new Date(date_obj.getTime());
                startDate.setHours(startTime.split(":")[0]);
                startDate.setMinutes(startTime.split(":")[1]);
                startDate.setSeconds(startTime.split(":")[2]);
                endDate = new Date(date_obj.getTime());
                endDate.setHours(endTime.split(":")[0]);
                endDate.setMinutes(endTime.split(":")[1]);
                endDate.setSeconds(endTime.split(":")[2]);
                if (startDate < date_obj && endDate > date_obj) {
                    my_class = i;
                    links_updated[i].style.background = "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #098A82"
                    normal_schedule = true;
                    class_is_over = false;
                    break;
                }
            }
            if (sgi) {
                if (!normal_schedule) {
                    sgi_times = sgi.length>2 ? ["13:20:00", "13:50:00", "14:20:00", "14:50:00"] : ["13:20:00", "14:05:00", "14:50:00"];
                    for (i = 0; i < sgi_times.length-1; i++) {
                        startTime = sgi_times[i];
                        endTime = sgi_times[i+1];
                        startDate = new Date(date_obj.getTime());
                        startDate.setHours(startTime.split(":")[0]);
                        startDate.setMinutes(startTime.split(":")[1]);
                        startDate.setSeconds(startTime.split(":")[2]);
                        endDate = new Date(date_obj.getTime());
                        endDate.setHours(endTime.split(":")[0]);
                        endDate.setMinutes(endTime.split(":")[1]);
                        endDate.setSeconds(endTime.split(":")[2]);
                        if (startDate < date_obj && endDate > date_obj) {
                            my_class = i+classes_times.length-1;
                            links_updated[i+classes_times.length-1].style.background = "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #098A82"
                            class_is_over = false;
                            break;
                        }
                        
                    }
                }
    
            }
            if (class_is_over) {
                my_class = "trigger default";
                container[0].id = "container-style2";
            }    
            return my_class;
        }
    }
    

})();