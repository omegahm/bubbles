FROM lokalebasen/rubies:2.2.2
MAINTAINER Mads Ohm Larsen <ml@lokalebasen.dk>
ENV REFRESHED_AT 2015-08-25

WORKDIR /var/www/event_bubbles/current

ENV ETCD_ENV event_bubbles

ADD Gemfile /var/www/event_bubbles/current/Gemfile
ADD Gemfile.lock /var/www/event_bubbles/current/Gemfile.lock

RUN bundle install --deployment --without test development

ADD . /var/www/event_bubbles/current

EXPOSE 8080

CMD ["bundle", "exec", "rackup", "config.ru", "-p", "8080"]
