import axios from 'axios'
import { useQueries } from '@tanstack/react-query'

const fetchResult = async (id: number) => {
    const res = await axios.get('https://fakestoreapi.com/products/' + id)
    return res.data
}

type DynamicProps = { hid: number[] }
const Dynamic = ({ hid }: DynamicProps) => {
    const result = useQueries({
        queries: hid.map((id: number) => ({
            queryKey: ['cloths', id],
            queryFn: () => fetchResult(id),
        })),
    })
    console.log(result)
    return <div>This is a dynamically loaded page.</div>
}

export default Dynamic