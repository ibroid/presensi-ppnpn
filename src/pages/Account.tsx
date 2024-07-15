import { useState, useEffect } from 'react'
<<<<<<< HEAD
=======
import { supabase } from '../utils/SupabaseClient'
>>>>>>> main

const Account = ({ session }: any) => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session
<<<<<<< HEAD
=======

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
>>>>>>> main
        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e: any) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { user } = session

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

<<<<<<< HEAD
=======
            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
>>>>>>> main
        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div aria-live="polite">
            {loading ? (
                'Saving ...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div>Email: {session.user.email}</div>
                    <div>
                        <label htmlFor="username">Name</label>
                        <input
                            id="username"
                            type="text"
                            value={username || ''}
                            onChange={(e: any) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="website">Website</label>
                        <input
                            id="website"
                            type="url"
                            value={website || ''}
                            onChange={(e: any) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="button primary block" disabled={loading}>
                            Update profile
                        </button>
                    </div>
                </form>
            )}
<<<<<<< HEAD
            <button type="button" className="button block" onClick={() => { }}>
=======
            <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
>>>>>>> main
                Sign Out
            </button>
        </div>
    )
}

export default Account