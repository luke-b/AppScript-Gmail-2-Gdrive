// Moves only ZIP files from attachments to folder '__ZIPS' - change or remove the filter on the line #63
// Execution is logged to a text file named '__execution3.txt' where all the attachments are listed without filter

function moveZipsFromGmail() {
  
  var scriptProperties = PropertiesService.getScriptProperties();
 
  var queryOffset = 0;
  var pageSize = 20;
  
  var qoff = scriptProperties.getProperty('QUERY_OFFSET3');
  
  if (qoff == null || qoff == 0.0) {
      scriptProperties.setProperty('QUERY_OFFSET3',0);
  } else {
      queryOffset = scriptProperties.getProperty('QUERY_OFFSET3');
  }
  
  var logFiles = DriveApp.getFilesByName('__execution3.txt');
   
  if (!logFiles.hasNext()) {
      var logFile = DriveApp.createFile('__execution3.txt', '-- execution started -- \n\n');
  } else {
      var logFile = logFiles.next();
      var blob = logFile.getAs('text/plain'); 
      logFile.setContent(blob.getDataAsString() + '> executed with queryOffset =' + queryOffset + '\n');
  }
 
 Logger.log('query offset = ' + queryOffset);
 
  
 var folder;
 var folders = DriveApp.getFoldersByName("__ZIPS");

  if (folders.hasNext()) {
   
   folder = folders.next(); 
 } else {
    
   folder = DriveApp.createFolder("__ZIPS");
 }

  
 var query = 'has:attachment';
 var threads = GmailApp.search(query, queryOffset, pageSize);  
 var msgs = GmailApp.getMessagesForThreads(threads);
  
  Logger.log("num of messages: " + msgs.length);

  for(var i in threads){ 
    var mesgs = threads[i].getMessages();
   
    for(var j in mesgs){
      //get attachments
      var attachments = mesgs[j].getAttachments();
      
      for(var k in attachments){
        var attachment = attachments[k];
      
         var blob = logFile.getAs('text/plain'); 
        logFile.setContent(blob.getDataAsString() + '\t\t' + attachment.getName() + '\n');
        
        if (attachment.getName().toLowerCase().indexOf('.zip') >= 0) {
        
           var attachmentBlob = attachment.copyBlob();
           var file = DriveApp.createFile(attachmentBlob);
           folder.addFile(file);
        }
      }
    }
  }
   
  var newOffset = Number(queryOffset) + Number(pageSize);
  
  scriptProperties.setProperty('QUERY_OFFSET3',newOffset);
}
