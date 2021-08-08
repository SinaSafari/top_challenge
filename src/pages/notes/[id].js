import UpdateNote from "@/components/UpdateNote"
import axios from "axios"
import Head from 'next/head'

export default function SingleNote({ data }) {
    return (
        <>
            {data.success ? (
                <>
                    <Head>
                        <title>Note Taker | {data.data.title}</title>
                        <meta property="og:title" content={`${udata.data.title}`} />
                    </Head>
                    <div>
                        <UpdateNote note={data.data} />
                    </div>
                </>
            ) : (
                <>
                    <Head>
                        <title>Note Taker | data not found</title>
                    </Head>
                    <p className="text-center">Note Not Found :(</p>
                </>
            )}

        </>

    )
}

export async function getServerSideProps(ctx) {
    const id = ctx.params.id
    const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`)
    return {
        props: {
            data
        }
    }
}