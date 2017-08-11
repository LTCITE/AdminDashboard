
# Canvas Admin Dashboard
-------------

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Integration](#integration)
4. [Usage](#usage)
   - [Initialization](#initialization)
   - [Maintenance](#maintenance)
5. [Contact Us](#contact-us)

## Introduction

The Canvas Admin Dashboard is an LTI tool in canvas that allows admins to monitor status of student information system(SIS). This application has three main parts. 
1. **Canvas status**: It helps admin to know if there are any partial outage or everything is running fine with respect to canvas.
2.  **SIS import statements**: It shows the status of SIS imports.
3. **Statistics**: It sows total number of records updated in latest batch.
4. **Canvas calendar**: Used to keep admins updated about canvas events.
An Excel sheet can be downloaded from the page which contains logs and summary of any errors or warnings in SIS imports. The excel sheet resets every month.

## Requirements
- Canvas
- EduAppCenter

## Integration
- Deploy the application on your school's server. You can follow this [guide][2]
- Install the application on your own instance of EduAppCenter or use our default configured settings [here][3]. 
- Generate Developer Keys and Admin access token for the LTI by following steps [here][4] and [here][5].
- You need to update the variables with your values in config.js file under /config folder.
- Install the LTI on your instance of Canvas by following steps [here][6].

> **Note:**
> - Server must be secure in order for the LTI to work.
> - You can customize error page according to your needs.
> - Need browser settings as canvas status is not a secure  site.

## Usage
#### Initialization
Demo video (coming soon)
#### Maintenance
- You need to backup the excel sheet every month which contains logs and summary of SIS imports.

## Contact Us
Learning and Teaching Center  
Northwest Missouri State University  
800 University Drive  
Maryville, MO - 64468  

Email: [ltcite@nwmissouri.edu](ltcite@nwmissouri.edu)  
Phone: (660) 562-1532

[1]: https://canvas.instructure.com/
[2]: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
[3]: http://eduappcenter.com/
[4]: https://community.canvaslms.com/docs/DOC-10864-4214441833
[5]: https://community.canvaslms.com/docs/DOC-10806-4214724194
[6]: https://community.canvaslms.com/docs/DOC-10756-421474559
