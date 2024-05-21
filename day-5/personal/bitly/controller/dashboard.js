import fs from "fs";
import path from "path";

function Dashboard(req,res){
    const dashboardHtmlPath = path.join(process.cwd(),"pages","dashboard.html");
    const dashboardHtml = fs.readFileSync(dashboardHtmlPath,"utf-8");
    res.send(dashboardHtml);
}

export default Dashboard;