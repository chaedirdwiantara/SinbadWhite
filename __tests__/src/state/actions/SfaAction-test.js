import 'react-native';
import React from 'react';
import * as SfaType from '../../../../src/state/types/SfaType';
import * as SfaAction from '../../../../src/state/actions';
describe('action', () => {
    /** GET COLLECTION STATUS */ 
    describe('get collection status', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetCollectionStatusProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_STATUS_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetCollectionStatusSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_STATUS_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetCollectionStatusFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_STATUS_FAILED)
            );
        });
    })

    /** GET DETAIL SFA */
    describe('get SFA detail', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetDetailProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_DETAIL_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetDetailSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_DETAIL_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetDetailFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_DETAIL_FAILED)
            );
        });
    })

     /** GET COLLECTION LIST SFA */
     describe('get collection list', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetCollectionListProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetCollectionListSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetCollectionListFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_FAILED)
            );
        });

         /** GET REFERENCE LIST */
    describe('get reference list', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetReferenceListProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_REFERENCE_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetReferenceListSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_REFERENCE_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetReferenceListFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_REFERENCE_FAILED)
            );
        });
    })
    })

     /** GET PAYMENT METHOD */
     describe('get payment method', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetPaymentMethodProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_PAYMENT_METHOD_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetPaymentMethodSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_PAYMENT_METHOD_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetPaymentMethodFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_PAYMENT_METHOD_FAILED)
            );
        });
    });

     /** GET ALL BANK */
     describe('get all bank', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetAllBankProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_ALL_BANK_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetAllBankSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_ALL_BANK_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetAllBankFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_ALL_BANK_FAILED)
            );
        });
    })
     /** GET BANK ACCOUNT*/
     describe('get SFA detail', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetBankAccountProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_BANK_ACCOUNT_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetBankAccountSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_BANK_ACCOUNT_PROCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetBankAccountFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_BANK_ACCOUNT_FAILED)
            );
        });
    })

     /** POST PAYMENT METHOD SFA */
     describe('post payment method', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaPostPaymentMethodProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_POST_PAYMENT_METHOD_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaPostPaymentMethodSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_POST_PAYMENT_METHOD_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaPostPaymentMethodFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_POST_PAYMENT_METHOD_FAILED)
            );
        });
    });

     /** POST COLLECTION PAYMENT */
     describe('post collection payment', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaPostCollectionPaymentProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_POST_COLLECTION_PAYMENT_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaPostCollectionPaymentSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_POST_COLLECTION_PAYMENT_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaPostCollectionPaymentFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_POST_COLLECTION_PAYMENT_FAILED)
            );
        });
    });

     /** GET STAMP LIST */
     describe('get stamp list', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetStampListProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_STAMP_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetStampListSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_STAMP_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetStampListFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_STAMP_FAILED)
            );
        });
    });

    describe('sfa get load more', () => {
        const page = 10;
        const factory = type => ({
            type: type,
            payload: page
        })
        it('should create action to trigger process', function(){
           
            const result = SfaAction.SfaGetLoadMore(page);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_LOADMORE)
            )
        });
    })
    describe('sfa get refresh', () => {
        const page = 10;
        const factory = type => ({
            type: type,
        })
        it('should create action to trigger process', function(){
           
            const result = SfaAction.sfaGetRefresh();
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_REFRESH)
            )
        });
    })

    /** GET TRANSFER IMAGE*/
    describe('get transfer image', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetCollectionImageProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_IMAGE_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetCollectionImageSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_IMAGE_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetCollectionImageFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_IMAGE_FAILED)
            );
            });
        });
            /** GET PRINCIPAL */
     describe('get principal', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetPrincipalProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_PRINCIPAL_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetPrincipalSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_PRINCIPAL_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetPrincipalFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_PRINCIPAL_FAILED)
            );
        });
    })
        /** GET loadmore principal */
        describe('get loadmore principal', () => {
            const data = {
                code: 200,
                data: {
                    code: 200,
                    data: {
                        name: "Success",
                        code: 200,
                        data: {}
                    },
                    result: 'Ok'
                },  
            };
            const factory = type => ({
                type: type,
                payload: data
            })
    
            it('should create action to trigger process', function(){
                const result = SfaAction.sfaPrincipalLoadmoreProcess(data);
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_PRINCIPAL_LOADMORE_PROCESS)
                )
            });
            it('should create action to trigger success', function() {
                // act
                const result = SfaAction.sfaPrincipalLoadmoreSuccess(data.data);
                // assert           
                    expect(result.payload).toStrictEqual(
                        factory(SfaType.SFA_PRINCIPAL_LOADMORE_SUCCESS).payload.data.data
                    );
            });
            it('should create action to trigger failed', function() {
                // act
                const result = SfaAction.sfaPrincipalLoadmoreFailed(data);
                // assert
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_PRINCIPAL_LOADMORE_FAILED)
                );
            });
        })

            /** GET loadmore bank destination */
     describe('get loadmore bank destination', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaBankAccountLoadmoreProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_BANK_ACCOUNT_LOADMORE_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaBankAccountLoadmoreSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_BANK_ACCOUNT_LOADMORE_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaBankAccountLoadmoreFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_BANK_ACCOUNT_LOADMORE_FAILED)
            );
        });
    })
    /** GET collection log */
    describe('get collection log', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaGetCollectionLogProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_LOG_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaGetCollectionLogSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_LOG_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaGetCollectionLogFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_GET_COLLECTION_LOG_FAILED)
            );
        });
    })
    /** GET loadmore collection log*/
    describe('get loadmore collection log', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                result: 'Ok'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaCollectionLogLoadmoreProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_COLLECTION_LOG_LOADMORE_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaCollectionLogLoadmoreSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_COLLECTION_LOG_LOADMORE_SUCCESS).payload.data.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaCollectionLogLoadmoreFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_COLLECTION_LOG_LOADMORE_FAILED)
            );
        });
    })
        /** GET collection detail */
        describe('get collection detail', () => {
            const data = {
                code: 200,
                data: {
                    code: 200,
                    data: {
                        name: "Success",
                        code: 200,
                        data: {}
                    },
                    result: 'Ok'
                },  
            };
            const factory = type => ({
                type: type,
                payload: data
            })
    
            it('should create action to trigger process', function(){
                const result = SfaAction.sfaGetCollectionDetailProcess(data);
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_DETAIL_PROCESS)
                )
            });
            it('should create action to trigger success', function() {
                // act
                const result = SfaAction.sfaGetCollectionDetailSuccess(data.data);
                // assert           
                    expect(result.payload).toStrictEqual(
                        factory(SfaType.SFA_GET_COLLECTION_DETAIL_SUCCESS).payload.data.data
                    );
            });
            it('should create action to trigger failed', function() {
                // act
                const result = SfaAction.sfaGetCollectionDetailFailed(data);
                // assert
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_GET_COLLECTION_DETAIL_FAILED)
                );
            });
        })
        /** PATCH COLLECTION */
        describe('patch edit collection', () => {
            const data = {
                code: 200,
                data: {
                    code: 200,
                    data: {
                        // name: "Success", 
                        code: 200,
                        data: {}
                    },
                    result: 'success'
                },  
            };

            const factory = type => ({
                type: type,
                payload: data
            })
    
            it('should create action to trigger process', function(){
                const result = SfaAction.sfaEditBillingProcess(data);
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_EDIT_BILLING_PROCESS)
                )
            });
            // it('should create action to trigger success', function() {
            //     // act
            //     const result = SfaAction.sfaEditBillingSuccess(data.data);

            //     // assert           
            //         expect(result.payload).toStrictEqual(
            //             factory(SfaType.SFA_EDIT_BILLING_SUCCESS).payload.data.data
            //         );
            // });
            it('should create action to trigger failed', function() {
                // act
                const result = SfaAction.sfaEditBillingFailed(data);
                // assert
                expect(result).toStrictEqual(
                    factory(SfaType.SFA_EDIT_BILLING_FAILED)
                );
            });
        })
    
    /** delete collection */
    describe('delete collection', () => {
        const data = {
            code: 200,
            data: {
                code: 200,
                data: {
                    name: "Success",
                    code: 200,
                    data: {}
                },
                name: 'Success'
            },  
        };
        const factory = type => ({
            type: type,
            payload: data
        })

        it('should create action to trigger process', function(){
            const result = SfaAction.sfaDeletePaymentBillingProcess(data);
            expect(result).toStrictEqual(
                factory(SfaType.SFA_DELETE_PAYMENT_BILLING_PROCESS)
            )
        });
        it('should create action to trigger success', function() {
            // act
            const result = SfaAction.sfaDeletePaymentBillingSuccess(data.data);
            // assert           
                expect(result.payload).toStrictEqual(
                    factory(SfaType.SFA_DELETE_PAYMENT_BILLING_SUCCESS).payload.data
                );
        });
        it('should create action to trigger failed', function() {
            // act
            const result = SfaAction.sfaDeletePaymentBillingFailed(data);
            // assert
            expect(result).toStrictEqual(
                factory(SfaType.SFA_DELETE_PAYMENT_BILLING_FAILED)
            );
        });
    })

        });

    