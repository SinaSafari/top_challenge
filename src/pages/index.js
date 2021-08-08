import CreateFrom from "@/components/CreateNoteForm"
import NotesList from "@/components/NotesList"
import axios from "axios"
import Head from 'next/head'


export default function Index({ data }) {
  return (
    <>
      <Head>
        <title>Note Taker | store your notes</title>
      </Head>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <CreateFrom />
        </div>
        <div className="col-md-8 col-sm-12">
          <NotesList notes={data.data} />
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(ctx) {

  const { data } = await axios.get("http://localhost:3000/api/notes")

  return {
    props: {
      data
    }
  }
}