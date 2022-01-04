import React, { Component } from 'react'
import Layout from './Layout'
import NoteCard from './NoteCard'

export default class WithLayout extends Component {
    render() {
        return (
            <Layout>
                <NoteCard/>
            </Layout>
        )
    }
}
