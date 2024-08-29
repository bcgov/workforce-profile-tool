'use client'

import { useCallback, useState } from 'react'
import { DataManagerProvider } from '../Data/DataManager'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryParamProvider } from 'use-query-params'
import Header from '../Core/Header'
import Main from '../Core/Main'
import VariableList from '../Variables/VariableList'

export default function Client() {
    const [showList, setShowList] = useState<boolean>(false)

    const toggleListCallback = useCallback(() => {
        setShowList(!showList)
    }, [showList])

    const queryConfig = {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60,
                refetchOnWindowFocus: false,
            },
        },
    }

    const queryClient = new QueryClient(queryConfig)

    return (
        <QueryParamProvider adapter={ReactRouter5Adapter}>
            <QueryClientProvider client={queryClient}>
                <div className="App container-fluid">
                    <DataManagerProvider>
                        <div className="row">
                            <div className="LeftColumn col-12 col-sm-4 col-md-3 col-xl-2">
                                <Header
                                    toggleListCallback={toggleListCallback}
                                    showList={showList}
                                />
                                <VariableList showList={showList} />
                            </div>
                            <div className="col-12 col-sm-8 col-md-9 col-xl-10 MainWrapper">
                                <Main />
                            </div>
                        </div>
                    </DataManagerProvider>
                </div>
            </QueryClientProvider>
        </QueryParamProvider>
    )
}