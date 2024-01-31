import { useState, useEffect } from 'react'

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
            <button type="button" className="button block" onClick={() => { }}>
                Sign Out
            </button>
        </div>
    )
}

export default Account