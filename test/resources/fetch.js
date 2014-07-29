test( "Fetch server", function () {
  $("body").append("<div id='grid5'>");
  var collection = Backbone.Collection.extend( { url: '/people' } ),
      dataCols = new collection();

  grid5 = new w5.Grid({
    el : "#grid5",
    option: {
      width : "650px",
      height : "400px",
      caption : "TEST",
      rowNum : 10
    },
    collection : dataCols,
    colModel : [
      {
        width: 150,
        id: 'first_name',
        headerLabel: 'col1'
      },
      {
        width: 150,
        id: 'last_name',
        headerLabel: 'col2'
      },
      {
        width: 150,
        headerLabel: 'company_name'
      },
      {
        width: 150,
        headerLabel: 'address'
      },
      {
        width: 150,
        id: 'city',
        headerLabel: 'col5'
      },
      {
        width: 150,
        id: 'county',
        headerLabel: 'col6'
      },
      {
        width: 150,
        id: 'state',
        headerLabel: 'col7'
      },
      {
        width: 150,
        headerLabel: 'zip'
      },
      {
        width: 150,
        id: 'phone1',
        headerLabel: 'col9'
      },
      {
        width: 150,
        headerLabel: 'phone2'
      },
      {
        width: 150,
        id: 'email',
        headerLabel: 'col11'
      },
      {
        width: 150,
        headerLabel: 'web'
      }
    ],
    defaults : function () {
      return {
        first_name: '',
        last_name: '',
        company_name: '',
        address: '',
        city: '',
        county: '',
        state: '',
        zip: '',
        phone1: '',
        phone2: '',
        email: '',
        web: ''
      };
    }
  }).render();

  ok( true, 'dummy' );

  asyncTest( "request to server", 1, function () {
    expect( 1 );
    dataCols.fetch( { reset: true, success: function () {
      ok( grid5.getRowLength() === 500, 'read from server' );
      start();
    } } );
  } );
});

test( "fetch Server2", function () {
  var model = Backbone.Model.extend( { idAttribute: "_id" } ),
      collection = Backbone.Collection.extend( { model: model } );

  $("body").append("<div id='grid6'>");

  dataCols2 = new collection();
  dataCols2.url = '/people';

  grid6 = new w5.Grid({
    el : "#grid6",
    option: {
      width : "650px",
      height : "400px",
      caption : "TEST2",
      rowNum : 10
    },
    collection : dataCols2,
    colModel : [
      {
        width: 150,
        id: 'first_name',
        headerLabel: 'col1'
      },
      {
        width: 150,
        id: 'last_name',
        headerLabel: 'col2'
      },
      {
        width: 150,
        headerLabel: 'company_name'
      },
      {
        width: 150,
        headerLabel: 'address'
      },
      {
        width: 150,
        id: 'city',
        headerLabel: 'col5'
      },
      {
        width: 150,
        id: 'county',
        headerLabel: 'col6'
      },
      {
        width: 150,
        id: 'state',
        headerLabel: 'col7'
      },
      {
        width: 150,
        headerLabel: 'zip'
      },
      {
        width: 150,
        id: 'phone1',
        headerLabel: 'col9'
      },
      {
        width: 150,
        headerLabel: 'phone2'
      },
      {
        width: 150,
        id: 'email',
        headerLabel: 'col11'
      },
      {
        width: 150,
        headerLabel: 'web'
      }
    ],
    defaults : function () {
      return {
        first_name: '',
        last_name: '',
        company_name: '',
        address: '',
        city: '',
        county: '',
        state: '',
        zip: '',
        phone1: '',
        phone2: '',
        email: '',
        web: ''
      };
    }
    ,
    fetch: {
      success: function ( collection, response, options ) {
        test( "request to server2", function () {
          ok( grid6.getRowLength() === 500, 'fetch from server' );
        });
      }
    }
  }).render();

  ok( true, 'dummy' );
});

QUnit.testDone = function ( details ) {
  if ( details.name === 'request to server2' ) {
    test( 'request to server2-1', function () {
      ok( grid6.cell(0,0).get('data') === 'James', 'cell(0,0) is James' );
      grid6.cell(0,0).set('data', 'Ruud');
      ok( grid6.cell(0,0).get('data') === 'Ruud', 'cell(0,0) is Ruud' );

      asyncTest( "fetch1", function () {
        expect(1);
        dataCols2.at(0).fetch( { success: function () {
          ok( grid6.cell(0,0).get('data') === 'James', 'restore server data' );
          var data = { phone1: '111-111-1111', phone2: '222-222-2222' };
          grid6.row(0).set('data', data, { save: true, saved: true } );
          start();

          asyncTest( "fetch2", function () {
            expect(1);
            dataCols2.at(0).fetch( { success: function (model, response, options) {
              deepEqual( _.pick( response, ['phone1', 'phone2'] ), data, "update was successful");
              grid6.cell(0,0).set( 'data', 'Ruud', { save: true, saved: true, pick: true } );
              start();

              asyncTest( "fetch3", function () {
                expect(1);
                dataCols2.at(0).fetch( { success: function (model, response, options) {
                  equal( response.first_name, 'Ruud', data, "patch was successful" );
                  var data2 = { phone1: '504-621-8927', phone2: '504-845-1427' };
                  grid6.row(0).set( 'data', data2, { save: true, saved: true, pick: ['phone1', 'phone2'] } );
                  start();

                  asyncTest( "fetch4", function () {
                    expect(2);
                    dataCols2.at(0).fetch( { success: function (model, response, options) {
                      deepEqual( _.pick( response, ['phone1', 'phone2'] ), data2, "patch2 was successful");
                      var data3 = { "first_name": "shye", "last_name": "lee", "company_name": "inswave", "address": "guro", "city": "seoul", "county": "korea", "state": "guro", "zip": "1234", "phone1": "123-456-1234", "phone2": "789-123-4567", "email": "shye0919@inswave.com", "web": "http://www.inswave.com" };
                      grid6.addRow( 0, data3, { save: true, success: function ( model, response, options ) {
                        deepEqual( _.omit( response, '_id' ), data3, "create was successful");
                        start();
                      }} );

                      asyncTest( "fetch5", function () {
                        expect(1);
                        grid6.removeRow( 0, { destroy: true, success: function ( model, response, options ) {
                          equal( response.result, 'success', 'remove was successful');
                          grid6.cell(0,0).set( 'data', 'James', { save: true, saved: true, pick: true } );
                          start();
                        }});
                      });

                    }});
                  });
                }});
              });
            }});
          });
        }});
      });
    });
  }
};
