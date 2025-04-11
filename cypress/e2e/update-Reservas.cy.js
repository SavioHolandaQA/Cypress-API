/// <reference types="cypress" />

describe('criar reserva e depois atualizar', () => {


    var token = ""
    var bookingid = ""

    before('login', () => {

        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {

                "username": "admin",
                "password": "password123"
            }

        })

            .then((response) => {
                token = response.body.token
            })
    })

    beforeEach('Cadastrar reserva', () => {


        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking/',
            failOnStatusCode: false,
            body: {

                "firstname": "savio",
                "lastname": "Nascimento",
                "totalprice": 200,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-02-01",
                    "checkout": "2020-02-04"
                },
                "additionalneeds": "Breakfast"

            }

        }).then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.booking.totalprice).to.eql(200)

            bookingid = response.body.bookingid


        })
    })
    it('Atualizar reserva com sucesso ', () => {

        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            body: {

                "firstname": "Nova",
                "lastname": "Reserva",
                "totalprice": 5000,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-02-01",
                    "checkout": "2020-02-04"
                },
                "additionalneeds": "Breakfast"

            },

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }

        })
            .then((response) => {
                expect(response.status).to.eq(200)

                console.log(response.body);
                expect(response.status).to.eq(200);
                expect(response.body.bookingdates.checkin).to.eq('2020-02-01');
                expect(response.body.bookingdates.checkout).to.eq('2020-02-04');
                expect(response.body.lastname).to.eq('Reserva');
                expect(response.body.firstname).to.eq('Nova');
            });
    })


    //Cenário de falha
    it('Atualizar reserva com token invalido ', () => {

        cy.request({
            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            body: {

                "firstname": "Savio",
                "lastname": "Holanda",
                "totalprice": 20,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2020-02-01",
                    "checkout": "2020-02-04"
                },
                "additionalneeds": "Breakfast"

            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${12122}`    //invalido token, erro 403
            }

        })
            .then((response) => {
                expect(response.status).to.eq(403)
                expect(response.body).to.include('Forbidden')
            })

    })


})

