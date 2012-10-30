An example Vert.x application, used for demoing Vert.x.

# Prereqs

* JDK 7
* Vert.x master. Follow the [build instructions](https://github.com/vert-x/vert.x/wiki/Build-instructions)


# Usage

* Set the `TWITTER_BASIC_AUTH` environment variable. It should hold your Twitter username and password,
  separated by a colon, base64 encoded. (E.g. output of `echo "username:password" | base64`). This is required
  for authenticating to Twitter in `tweets.coffee`
* Launch the app: `vertx run app.coffee`
* Point your browser to http://localhost:8080


# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT).
