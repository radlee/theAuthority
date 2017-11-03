exports.show = function(req, res, next){

  results = [
       {
         user_id: 1,
         name: 'Elisia',
         surname: 'Chessel',
         username: 'EC-1',
         password: '123',
         email: 'chessel@gmail.com',
         state: 'Online'
       },
       {
         user_id: 2,
         name: 'Gilbert',
         surname: 'Leistner ',
         username: 'GL-2',
         password: '123',
         email: 'leistner@mail.com',
         state: 'Online'
       },
       {
         user_id: 3,
         name: 'Keith',
         surname: 'Safian',
         username: 'KS-3',
         password: '123',
         email: 'safiain@mail.com',
         state: 'Online'
       },
       {
         user_id: 4,
         name: 'Lolito',
         surname: 'Mafanga',
         username: 'LM-4',
         password: '123',
         email: 'mafanga@mail.com',
         state: 'Offline'
       }
     ]

     res.render('page5', {
       user: req.session.user,
       no_users : results.length == 0,
       users : results
     });



};
