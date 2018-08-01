# gmail-attachments-2-gdrive
Google App Script that moves all zip files in Gmail attachments to a signle Google drive folder <br/>
This script has been sucessfully tested against the Google Apps Script APIs of July 2018<br/>
(due to Google App script restrictions (execution time, gmail search result limits) the script runs multiple
times and requires to be scheduled)
Usage:<br/>
* upload the <b>gmail2drive.gs</b> script to your google drive<br/>
* open the App Script editor by clicking on the file in google drive<br/>
* inside the editor try running the function moveZipsFromGmail() to authorize it with your google account<br/>
* setup a scheduler to run the function (every 5 mins)<br/>
<br/>
the script will collect ZIP files from Gmail to a folder called '__ZIPS'<br/>


