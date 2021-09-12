# Seashell

Install using `npm install -g seashell-bin`
> temporarily disabled to fix some issues

Seashell is a CLI application that you can use to store lengthy commands in the cloud. This project was inspired by Docker Hub, where you can run a single command with some parameters and the image name and it'll run an entire application for you.

For instance, let's say we wanted to run a Jenkins server. For my computer, the command looks something like this:
```
/usr/local/opt/openjdk@11/bin/java -Dmail.smtp.starttls.enable=true -jar /usr/local/opt/jenkins-lts/libexec/jenkins.war --httpListenAddress=127.0.0.1 --httpPort=8080
```
There's no way I can remember this off the top of my head. On top of that, I'm too lazy to have a place to keep my commands. 
Instead, what we can do with Seashell is push the command to our server, then whenever you want to run the command, you can just type `seash exec dbvora03/jenkins` into your terminal.



## Commands

`seash exec <commandtag>`
> Runs the command that is associated with that tag in your terminal

`seash add -f <filepath> -name <command-name> -description <description> -isPrivate <boolean>`
> Have an sh or txt file with the command and specify the path to the file
> Specify the name, description (optional), and whether you want it private or not
> When you execute this command, it will be in the form `<username>/<command-name>`

`seash login -e <email> -p <password>`
> Log in to your seashell account

`seash signup -e <email> -u <username> -p <password>`
> Sign's you up for seashell

`seash -h`
> If you need help

`seash -v`
> Check's the current version of seashell installed


