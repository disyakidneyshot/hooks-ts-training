import { errorsDictionary } from './dictionary'
import { put, StrictEffect } from 'redux-saga/effects'
import { ActionCreator } from 'redux'

interface IError {
	code: string
	message: string
}

export function putError<A extends ActionCreator<any>>(
	action: A,
	err: IError
): StrictEffect<any, any> {
	const localError =
		(err.code && errorsDictionary[err.code]) || errorsDictionary.default
	return put(action(localError))
}
